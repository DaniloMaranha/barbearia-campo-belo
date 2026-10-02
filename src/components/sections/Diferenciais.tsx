import { Scissors, UserCheck, Star, Sparkles, Coffee, CalendarCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const ITENS = [
  { icone: Scissors, titulo: "Profissionais especializados", texto: "Técnica clássica e tendências atuais." },
  { icone: UserCheck, titulo: "Atendimento personalizado", texto: "Cada corte pensado para o seu rosto e estilo." },
  { icone: Star, titulo: "Qualidade em cada detalhe", texto: "Acabamento preciso do início ao fim." },
  { icone: Sparkles, titulo: "Produtos de qualidade", texto: "Linhas profissionais em todos os serviços." },
  { icone: Coffee, titulo: "Ambiente confortável", texto: "Boa música e um espaço para relaxar." },
  { icone: CalendarCheck, titulo: "Agendamento fácil", texto: "Marque pelo WhatsApp em segundos." },
];

export function Diferenciais() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Por que a Campo Belo</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Nossos diferenciais</h2>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {ITENS.map((item, i) => (
            <Reveal key={item.titulo} delay={i * 0.06}>
              <div className="group h-full bg-surface p-8 transition-colors duration-300 hover:bg-surface-2">
                <item.icone
                  className="h-7 w-7 text-primary transition-transform duration-300 group-hover:-translate-y-1"
                  strokeWidth={1.5}
                />
                <h3 className="mt-5 text-xl">{item.titulo}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
