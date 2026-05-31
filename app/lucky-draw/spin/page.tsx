"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Lock, Sparkles, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Entry = { number: number; created_at: number };
type Winner = { number: number; won_at: number };

type State = {
  isAdmin: boolean;
  count: number;
  winners: Winner[];
  entries?: Entry[];
};

export default function SpinPage() {
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
      // keep last known state
    }
  }, []);

  useEffect(() => {
    fetchState();
    const id = setInterval(fetchState, 3000);
    return () => clearInterval(id);
  }, [fetchState]);

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-cnd-indigo text-cnd-light">
      <div className="pointer-events-none absolute inset-0 bg-grid-cyber opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-grid-cyber-fine opacity-40" />

      <Link
        href="/lucky-draw"
        className="absolute top-4 left-4 z-10 flex items-center gap-1.5 text-sm text-cnd-light/50 transition-colors hover:text-cnd-cyan"
      >
        <ArrowLeft className="size-4" /> Manage numbers
      </Link>

      <div className="relative flex flex-1 items-center justify-center px-4 py-12">
        {isAdmin === null ? (
          <p className="text-sm text-cnd-light/40">Loading…</p>
        ) : isAdmin ? (
          <SpinStage state={state} refresh={fetchState} />
        ) : (
          <LoginGate onLoggedIn={fetchState} />
        )}
      </div>
    </main>
  );
}

function SpinStage({ state, refresh }: { state: State | null; refresh: () => void }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rollingNumber, setRollingNumber] = useState<number | null>(null);
  const [winner, setWinner] = useState<Winner | null>(null);
  const [error, setError] = useState("");
  const spinTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (spinTimer.current) clearInterval(spinTimer.current);
    };
  }, []);

  const count = state?.count ?? 0;
  const winners = state?.winners ?? [];
  const pool = state?.entries ?? [];
  const canSpin = count > 0 && !isSpinning;

  async function spin() {
    if (!canSpin) return;
    setWinner(null);
    setIsSpinning(true);
    setError("");

    const numbers = pool.length
      ? pool.map((p) => p.number)
      : Array.from({ length: 10 }, (_, i) => i + 1);

    const dataPromise = fetch("/api/lucky-draw/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "spin" }),
    })
      .then((r) => r.json().then((d) => ({ ok: r.ok, d })))
      .catch(() => ({ ok: false, d: { error: "Network error." } }));

    let ticks = 0;
    spinTimer.current = setInterval(async () => {
      ticks += 1;
      setRollingNumber(numbers[Math.floor(Math.random() * numbers.length)]);

      if (ticks >= 32) {
        if (spinTimer.current) clearInterval(spinTimer.current);
        const { ok, d } = await dataPromise;
        if (ok && d?.winner) {
          setRollingNumber(d.winner.number);
          setWinner(d.winner);
        } else {
          setError(d?.error ?? "Could not draw.");
        }
        setIsSpinning(false);
        refresh();
      }
    }, 75);
  }

  return (
    <div className="flex w-full max-w-3xl flex-col items-center">
      <p className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-cnd-cyan/30 bg-cnd-cyan/5 px-4 py-1.5 text-sm font-medium tracking-widest text-cnd-cyan uppercase">
        <Sparkles className="size-4" /> Lucky Draw
      </p>

      {/* The big announced number */}
      <div
        className={cn(
          "border-glow-cyan flex aspect-[2/1] w-full max-w-2xl items-center justify-center rounded-[2rem] border-2 border-cnd-cyan/30 bg-cnd-indigo/60 backdrop-blur",
          isSpinning && "animate-jitter"
        )}
      >
        {winner ? (
          <p className="text-glow-cyan text-[9rem] leading-none font-black tabular-nums sm:text-[14rem]">
            {winner.number}
          </p>
        ) : rollingNumber !== null ? (
          <p className="text-[9rem] leading-none font-black text-cnd-light/90 tabular-nums sm:text-[14rem]">
            {rollingNumber}
          </p>
        ) : (
          <p className="text-4xl font-medium text-cnd-light/30">Ready to spin</p>
        )}
      </div>

      {winner && !isSpinning && (
        <div className="mt-6 flex items-center gap-2 rounded-full border border-cnd-cyan/40 bg-cnd-cyan/10 px-5 py-2.5 text-lg">
          <Trophy className="size-5 text-cnd-cyan" />
          <span className="font-semibold">Winning number:</span>
          <span className="font-mono font-bold text-cnd-cyan">{winner.number}</span>
        </div>
      )}

      <Button
        size="lg"
        onClick={spin}
        disabled={!canSpin}
        className="mt-8 h-16 gap-2 rounded-full bg-cnd-cyan px-12 text-xl font-bold text-cnd-indigo hover:bg-cnd-cyan/80"
      >
        <Sparkles className="size-6" />
        {isSpinning ? "Spinning…" : winner ? "Spin again" : "Spin"}
      </Button>

      <p className="mt-5 text-sm text-cnd-light/50">{count} number{count === 1 ? "" : "s"} left in the pool</p>

      {count === 0 && <p className="mt-2 text-sm text-cnd-light/50">No numbers left to draw.</p>}
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      {winners.length > 0 && (
        <div className="mt-10 w-full max-w-2xl">
          <p className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold tracking-widest text-cnd-cyan uppercase">
            <Trophy className="size-3.5" /> Already drawn
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {winners.map((w) => (
              <span
                key={w.number}
                className="rounded-full border border-cnd-cyan/20 bg-cnd-cyan/5 px-3 py-1.5 font-mono text-sm font-bold text-cnd-cyan tabular-nums"
              >
                {w.number}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LoginGate({ onLoggedIn }: { onLoggedIn: () => void }) {
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
    <section className="w-full max-w-sm rounded-2xl border border-cnd-sky/20 bg-cnd-indigo/60 p-6 backdrop-blur">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide text-cnd-sky uppercase">
        <Lock className="size-4" /> Admin Login
      </h2>
      <form onSubmit={submit} className="space-y-3">
        <input
          type="password"
          placeholder="Admin password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full rounded-lg border border-cnd-sky/20 bg-cnd-indigo/40 px-3 py-2 text-sm text-cnd-light placeholder:text-cnd-light/40 outline-none transition-colors focus:border-cnd-cyan/60 focus:ring-1 focus:ring-cnd-cyan/40"
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
