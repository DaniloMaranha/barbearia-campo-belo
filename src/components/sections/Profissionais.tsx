import { Reveal } from "@/components/Reveal";
import { getBarbers, type Barber } from "@/lib/booking";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function Profissionais() {
  const [profissionais, setProfissionais] = useState<Barber[]>(() => getBarbers().filter((p) => p.ativo));

  useEffect(() => {
    const sync = () => setProfissionais(getBarbers().filter((p) => p.ativo));
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  return (
    <section id="profissionais" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">A equipe</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Conheça nossos barbeiros</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profissionais.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <article className="flex h-full flex-col border border-border bg-surface p-7 transition-colors duration-300 hover:border-primary/60">
                {p.foto ? (
                  <img src={p.foto} alt={`${p.nome}, barbeiro da Barbearia Campo Belo`} loading="lazy" className="h-56 w-full rounded-sm object-cover" />
                ) : (
                  <div className="grid h-56 w-full place-items-center rounded-sm bg-surface-2">
                    <span className="font-display text-6xl text-primary">{p.nome.charAt(0)}</span>
                  </div>
                )}
                <h3 className="mt-6 text-2xl">{p.nome}</h3>
                <p className="mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-primary">{p.especialidade}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.descricao}</p>
                <Link to="/agendar" className="mt-6 inline-flex w-full items-center justify-center rounded-sm border border-foreground/30 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-foreground transition hover:border-primary hover:text-primary">
                  Agendar com {p.nome}
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
