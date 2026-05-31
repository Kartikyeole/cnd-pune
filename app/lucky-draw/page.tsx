"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Hash, Lock, LogOut, Plus, Sparkles, Trash2, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";

type Entry = { number: number; created_at: number };
type Winner = { number: number; won_at: number };

type State = {
  isAdmin: boolean;
  count: number;
  winners: Winner[];
  entries?: Entry[];
};

export default function LuckyDrawPage() {
  // null = checking the cookie session, false = logged out, true = admin
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [state, setState] = useState<State | null>(null);

  const fetchState = useCallback(async () => {
    try {
      const res = await fetch("/api/lucky-draw/state", { cache: "no-store" });
      if (res.ok) {
        const data: State = await res.json();
        setState(data);
        setIsAdmin(data.isAdmin);
      }
    } catch {
      // keep the last known state
    }
  }, []);

  useEffect(() => {
    fetchState();
    const id = setInterval(fetchState, 3000);
    return () => clearInterval(id);
  }, [fetchState]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-cnd-indigo text-cnd-light">
      <div className="pointer-events-none absolute inset-0 bg-grid-cyber opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-grid-cyber-fine opacity-40" />

      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:py-16">
        <header className="mb-10 text-center">
          <p className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-cnd-cyan/30 bg-cnd-cyan/5 px-3 py-1 text-xs font-medium tracking-widest text-cnd-cyan uppercase">
            <Sparkles className="size-3.5" /> Lucky Draw
          </p>
          <h1 className="text-glow-cyan text-4xl font-bold tracking-tight sm:text-5xl">
            Number Spin
          </h1>
          <p className="mt-3 text-sm text-cnd-light/60">
            Add the numbers, then spin to draw and announce a random one.
          </p>
        </header>

        {isAdmin === null ? (
          <p className="py-10 text-center text-sm text-cnd-light/40">Loading…</p>
        ) : isAdmin ? (
          <AdminView state={state} onLogout={() => setIsAdmin(false)} refresh={fetchState} />
        ) : (
          <AdminLogin onLoggedIn={fetchState} />
        )}
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Login                                                               */
/* ------------------------------------------------------------------ */

function AdminLogin({ onLoggedIn }: { onLoggedIn: () => void }) {
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setChecking(true);
    try {
      const res = await fetch("/api/lucky-draw/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", password: pass }),
      });
      if (res.ok) onLoggedIn();
      else setError("Invalid password.");
    } catch {
      setError("Network error — please try again.");
    } finally {
      setChecking(false);
    }
  }

  return (
    <section className="mx-auto max-w-sm rounded-2xl border border-cnd-sky/20 bg-cnd-indigo/60 p-6 backdrop-blur">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide text-cnd-sky uppercase">
        <Lock className="size-4" /> Admin Login
      </h2>
      <form onSubmit={submit} className="space-y-3">
        <input
          type="password"
          placeholder="Admin password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className={inputCls}
          autoComplete="current-password"
          autoFocus
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
        <Button
          type="submit"
          disabled={checking}
          className="h-11 w-full bg-cnd-blue text-base font-semibold hover:bg-cnd-blue/80"
        >
          {checking ? "Checking…" : "Sign in"}
        </Button>
      </form>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Admin panel: add numbers, manage pool                               */
/* ------------------------------------------------------------------ */

function AdminView({
  state,
  onLogout,
  refresh,
}: {
  state: State | null;
  onLogout: () => void;
  refresh: () => void;
}) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [single, setSingle] = useState("");
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  const count = state?.count ?? 0;
  const entries = state?.entries ?? [];
  const winners = state?.winners ?? [];

  async function addRange(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setNotice("");
    const f = Number(from);
    const t = Number(to);
    if (!Number.isInteger(f) || !Number.isInteger(t)) {
      setFormError("Enter whole numbers for the range.");
      return;
    }
    await postNumbers({ from: f, to: t }, `Added numbers ${f}–${t}`);
    setFrom("");
    setTo("");
  }

  async function addSingle(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setNotice("");
    const n = Number(single);
    if (!Number.isInteger(n)) {
      setFormError("Enter a whole number.");
      return;
    }
    await postNumbers({ numbers: [n] }, `Added number ${n}`);
    setSingle("");
  }

  async function postNumbers(payload: object, label: string) {
    setBusy(true);
    try {
      const res = await fetch("/api/lucky-draw/numbers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error ?? "Could not add numbers.");
        return;
      }
      setNotice(
        `${label} — ${data.added} added${data.skipped ? `, ${data.skipped} skipped (already in pool/won)` : ""}.`
      );
      refresh();
    } catch {
      setFormError("Network error — please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function removeNumber(n: number) {
    await fetch(`/api/lucky-draw/numbers?number=${n}`, { method: "DELETE" });
    refresh();
  }

  async function adminAction(action: string) {
    await fetch("/api/lucky-draw/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
  }

  async function logout() {
    await adminAction("logout");
    onLogout();
  }

  async function reset() {
    if (!confirm("Reset everything? This deletes all numbers and winners.")) return;
    await adminAction("reset");
    refresh();
  }

  return (
    <>
      {/* Link to the dedicated spin screen */}
      <section className="mb-10 flex flex-col items-center">
        <Button
          asChild
          size="lg"
          className="h-12 gap-2 rounded-full bg-cnd-cyan px-8 text-base font-semibold text-cnd-indigo hover:bg-cnd-cyan/80"
        >
          <Link href="/lucky-draw/spin">
            <Sparkles className="size-5" /> Open Spin Screen
          </Link>
        </Button>
        <p className="mt-3 text-xs text-cnd-light/50">
          {count > 0
            ? `${count} number${count === 1 ? "" : "s"} in the pool — ready to spin.`
            : "Add some numbers to the pool first."}
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Add numbers + controls */}
        <section className="rounded-2xl border border-cnd-sky/20 bg-cnd-indigo/60 p-6 backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wide text-cnd-sky uppercase">
              <Hash className="size-4" /> Add Numbers
            </h2>
            <Button
              size="xs"
              variant="ghost"
              onClick={logout}
              className="text-cnd-light/60 hover:text-cnd-light"
            >
              <LogOut className="size-3" /> Logout
            </Button>
          </div>

          {/* Range */}
          <form onSubmit={addRange} className="flex items-end gap-2">
            <label className="flex-1">
              <span className="mb-1 block text-xs text-cnd-light/50">From</span>
              <input
                type="number"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className={inputCls}
                placeholder="1"
              />
            </label>
            <label className="flex-1">
              <span className="mb-1 block text-xs text-cnd-light/50">To</span>
              <input
                type="number"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className={inputCls}
                placeholder="100"
              />
            </label>
            <Button
              type="submit"
              disabled={busy}
              className="h-10 shrink-0 bg-cnd-blue font-semibold hover:bg-cnd-blue/80"
            >
              <Plus className="size-4" /> Range
            </Button>
          </form>

          {/* Single */}
          <form onSubmit={addSingle} className="mt-3 flex items-end gap-2">
            <label className="flex-1">
              <span className="mb-1 block text-xs text-cnd-light/50">Single number</span>
              <input
                type="number"
                value={single}
                onChange={(e) => setSingle(e.target.value)}
                className={inputCls}
                placeholder="42"
              />
            </label>
            <Button
              type="submit"
              disabled={busy}
              variant="outline"
              className="h-10 shrink-0 border-cnd-sky/40 bg-transparent text-cnd-sky hover:bg-cnd-sky/10 hover:text-cnd-sky"
            >
              <Plus className="size-4" /> Add
            </Button>
          </form>

          {formError && <p className="mt-3 text-xs text-red-400">{formError}</p>}
          {notice && <p className="mt-3 text-xs text-cnd-cyan">{notice}</p>}

          <div className="mt-5 border-t border-cnd-sky/10 pt-5">
            <Button
              variant="ghost"
              onClick={reset}
              className="h-9 w-full text-red-400/80 hover:bg-red-500/10 hover:text-red-400"
            >
              <Trash2 className="size-4" /> Reset All
            </Button>
          </div>
        </section>

        {/* Pool + winners */}
        <section className="rounded-2xl border border-cnd-sky/20 bg-cnd-indigo/60 p-6 backdrop-blur">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-cnd-sky uppercase">
            <Hash className="size-4" /> In the Pool ({count})
          </h2>
          {entries.length === 0 ? (
            <p className="py-6 text-center text-sm text-cnd-light/40">No numbers yet.</p>
          ) : (
            <div className="flex max-h-56 flex-wrap gap-2 overflow-y-auto pr-1">
              {entries.map((entry) => (
                <span
                  key={entry.number}
                  className="group flex items-center gap-1.5 rounded-lg border border-cnd-sky/15 bg-cnd-indigo/40 py-1 pr-1 pl-2.5 font-mono text-sm text-cnd-light tabular-nums"
                >
                  {entry.number}
                  <button
                    onClick={() => removeNumber(entry.number)}
                    className="rounded p-0.5 text-cnd-light/30 transition-colors hover:bg-red-500/15 hover:text-red-400"
                    aria-label={`Remove ${entry.number}`}
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {winners.length > 0 && (
            <>
              <h2 className="mt-6 mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-cnd-cyan uppercase">
                <Trophy className="size-4" /> Drawn ({winners.length})
              </h2>
              <div className="flex max-h-40 flex-wrap gap-2 overflow-y-auto pr-1">
                {winners.map((w) => (
                  <span
                    key={w.number}
                    className="rounded-lg border border-cnd-cyan/20 bg-cnd-cyan/5 px-2.5 py-1 font-mono text-sm font-bold text-cnd-cyan tabular-nums"
                  >
                    {w.number}
                  </span>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
}

const inputCls =
  "w-full rounded-lg border border-cnd-sky/20 bg-cnd-indigo/40 px-3 py-2 text-sm text-cnd-light placeholder:text-cnd-light/40 outline-none transition-colors focus:border-cnd-cyan/60 focus:ring-1 focus:ring-cnd-cyan/40";
