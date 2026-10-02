import { Scissors, Crown, Eye, Baby, Slice } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SERVICOS } from "@/data/site";
import { Link } from "@tanstack/react-router";

const ICONES = {
  scissors: Scissors,
  razor: Slice,
  crown: Crown,
  eye: Eye,
  child: Baby,
};

export function Servicos() {
  return (
    <section id="servicos" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">O que oferecemos</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Nossos serviços</h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Escolha o serviço, veja a disponibilidade e reserve seu horário em poucos passos.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICOS.map((s, i) => {
            const Icone = ICONES[s.icone];
            return (
              <Reveal key={s.nome} delay={i * 0.07}>
                <article className="group relative flex h-full flex-col border border-border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60">
                  {"destaque" in s && s.destaque && (
                    <span className="absolute right-5 top-5 bg-primary px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-primary-foreground">
                      {s.destaque}
                    </span>
                  )}
                  <Icone
                    className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                  <h3 className="mt-5 text-2xl">{s.nome}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {s.descricao}
                  </p>
                  <p className="mt-5 font-display text-xl text-foreground">{s.preco}</p>
                  <Link
                    to="/agendar"
                    className="mt-5 inline-flex w-full items-center justify-center rounded-sm border border-foreground/30 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-foreground transition hover:border-primary hover:text-primary"
                  >
                    Agendar
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
