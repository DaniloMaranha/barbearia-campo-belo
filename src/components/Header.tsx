import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MENU } from "@/data/site";
import { Link } from "@tanstack/react-router";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/90 py-2 backdrop-blur-md"
          : "py-4",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:px-8">
        <a href="#inicio" className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-sm bg-primary font-display text-lg leading-none text-primary-foreground">
            CB
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-lg leading-none tracking-wider sm:text-xl">
              Barbearia Campo Belo
            </span>
            <span className="hidden text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground sm:block">
              Est. Campo Belo · SP
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {MENU.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-medium uppercase tracking-[0.14em] text-foreground/75 transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/agendar"
            className="inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-primary-foreground transition hover:-translate-y-0.5 hover:bg-accent"
          >
            Agendar horário
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/agendar"
            className="hidden items-center justify-center rounded-sm bg-primary px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-primary-foreground sm:inline-flex"
          >
            Agendar
          </Link>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-sm border border-border text-foreground"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background/98 backdrop-blur-md lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-5 py-3">
            {MENU.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-sm uppercase tracking-[0.16em] text-foreground/80"
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/agendar"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center rounded-sm bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground"
            >
              Agendar horário
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
