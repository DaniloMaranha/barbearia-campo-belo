import { Reveal } from "@/components/Reveal";
import { CheckCircle2 } from "lucide-react";
import sobreImg from "@/assets/sobre.jpg";

const PONTOS = [
  {
    titulo: "Profissionais experientes",
    texto: "Especialistas em corte masculino, barba e navalha.",
  },
  {
    titulo: "Atendimento pontual",
    texto: "Seu horário é respeitado, sem espera desnecessária.",
  },
  {
    titulo: "Qualidade garantida",
    texto: "Produtos profissionais de primeira linha em cada serviço.",
  },
  {
    titulo: "Ambiente confortável",
    texto: "Boa música, boa conversa e um espaço pensado para relaxar.",
  },
];

export function Sobre() {
  return (
    <section id="sobre" className="bg-background py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal className="relative">
          <div className="relative overflow-hidden rounded-sm">
            <img
              src={sobreImg}
              alt="Barbeiro fazendo acabamento de barba com navalha na Barbearia Campo Belo"
              width={1200}
              height={1408}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-5 left-5 bg-primary px-6 py-4 text-primary-foreground shadow-red">
            <p className="font-display text-3xl leading-none">19+</p>
            <p className="text-[0.65rem] uppercase tracking-[0.2em]">
              Anos de experiência
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">Quem somos</p>
            <h2 className="mt-3 text-4xl leading-tight sm:text-5xl">
              Mais que uma barbearia. <span className="text-primary">Uma experiência.</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              A Barbearia Campo Belo nasceu para atender o homens que exige
              qualidade, ambiente agradável e atendimento pontual. Cada corte é feito com
              atenção aos detalhes e respeito ao seu estilo.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Não importa se você quer um clássico ou algo mais contemporâneo, aqui você
              sai exatamente do jeito que imaginou.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {PONTOS.map((p, i) => (
              <Reveal key={p.titulo} delay={i * 0.08}>
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{p.titulo}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{p.texto}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
