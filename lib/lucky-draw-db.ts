import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import path from "node:path";

/**
 * SQLite-backed store for the Lucky Draw.
 *
 * The admin supplies the pool of eligible numbers. The spin picks one at
 * random, announces it, and removes it from the pool so it can't repeat.
 *
 * The DB lives at LUCKY_DRAW_DB_PATH (default: <cwd>/data/lucky-draw.db).
 * NOTE: this needs a persistent filesystem. It works on a long-running server
 * (VPS, container, `next start`), but NOT on Vercel serverless, where the
 * filesystem is read-only/ephemeral — use Postgres there instead.
 */

export type Entry = { number: number; created_at: number };
export type Winner = { number: number; won_at: number };

/** Hard cap on how many numbers a single range-add may insert. */
export const MAX_RANGE = 10_000;

let _db: Database.Database | null = null;

function getDb(): Database.Database {
  if (_db) return _db;

  const dbPath =
    process.env.LUCKY_DRAW_DB_PATH ?? path.join(process.cwd(), "data", "lucky-draw.db");
  mkdirSync(path.dirname(dbPath), { recursive: true });

  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS entries (
      number     INTEGER PRIMARY KEY,
      created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS winners (
      number INTEGER PRIMARY KEY,
      won_at INTEGER NOT NULL
    );
  `);

  _db = db;
  return db;
}

/** Add numbers to the pool. Already-present and already-won numbers are skipped. */
export function addNumbers(numbers: number[]): { added: number; skipped: number } {
  const db = getDb();
  const now = Date.now();
  const insert = db.prepare(
    "INSERT OR IGNORE INTO entries (number, created_at) VALUES (?, ?)"
  );
  const alreadyWon = db.prepare("SELECT 1 FROM winners WHERE number = ?");

  let added = 0;
  const run = db.transaction((nums: number[]) => {
    for (const n of nums) {
      if (alreadyWon.get(n)) continue;
      const info = insert.run(n, now);
      if (info.changes > 0) added += 1;
    }
  });
  run(numbers);

  return { added, skipped: numbers.length - added };
}

export function removeNumber(number: number): void {
  getDb().prepare("DELETE FROM entries WHERE number = ?").run(number);
}

export function listEntries(): Entry[] {
  return getDb().prepare("SELECT * FROM entries ORDER BY number ASC").all() as Entry[];
}

export function listWinners(): Winner[] {
  return getDb().prepare("SELECT * FROM winners ORDER BY won_at DESC").all() as Winner[];
}

export function countEntries(): number {
  const row = getDb().prepare("SELECT COUNT(*) AS c FROM entries").get() as { c: number };
  return row.c;
}

/**
 * Draw a random number: pick one uniformly at random, move it into the winners
 * table, and remove it from the pool so it can't be drawn again.
 */
export function drawRandomWinner(): Winner | null {
  const db = getDb();
  const draw = db.transaction((): Winner | null => {
    const picked = db
      .prepare("SELECT number FROM entries ORDER BY RANDOM() LIMIT 1")
      .get() as { number: number } | undefined;
    if (!picked) return null;

    const wonAt = Date.now();
    db.prepare("DELETE FROM entries WHERE number = ?").run(picked.number);
    db.prepare("INSERT INTO winners (number, won_at) VALUES (?, ?)").run(picked.number, wonAt);
    return { number: picked.number, won_at: wonAt };
  });
  return draw();
}

/** Wipe everything. */
export function resetAll(): void {
  const db = getDb();
  db.transaction(() => {
    db.prepare("DELETE FROM entries").run();
    db.prepare("DELETE FROM winners").run();
  })();
}
