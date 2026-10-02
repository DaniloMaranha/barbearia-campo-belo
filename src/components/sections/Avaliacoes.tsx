import { Star, Quote } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { AVALIACOES } from "@/data/site";

export function Avaliacoes() {
  return (
    <section id="avaliacoes" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">O que falam de nós</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Quem conhece, recomenda.</h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Avaliações publicadas por clientes reais no Google.
          </p>
        </Reveal>

        {AVALIACOES.length === 0 ? (
          // Sem avaliações cadastradas: adicione em src/data/site.ts
          <p className="mt-12 border border-dashed border-border p-8 text-sm text-muted-foreground">
            Espaço reservado para as avaliações dos clientes.
          </p>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AVALIACOES.map((a, i) => (
              <Reveal key={a.nome + i} delay={i * 0.07}>
                <figure className="flex h-full flex-col border border-border bg-background p-7">
                  <Quote className="h-6 w-6 text-primary/60" />
                  <div className="mt-4 flex gap-0.5" aria-label={`${a.nota} de 5 estrelas`}>
                    {Array.from({ length: a.nota }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    “{a.texto}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-2 font-display text-base text-primary">
                      {a.nome.charAt(0)}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{a.nome}</span>
                      <span className="block truncate text-[0.7rem] text-muted-foreground">
                        {a.fonte}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
