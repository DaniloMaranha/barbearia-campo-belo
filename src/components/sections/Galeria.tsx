import { useState } from "react";
import { X, Instagram } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";
import { CONTATO } from "@/data/site";
import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
import g4 from "@/assets/g4.jpg";
import g5 from "@/assets/g5.jpg";
import g6 from "@/assets/g6.jpg";
import fachada from "@/assets/fachada.jpg";
import corteReal from "@/assets/corte-real.png";

const FOTOS = [
  { src: fachada, alt: "Fachada real da Barbearia Campo Belo" },
  { src: corteReal, alt: "Corte masculino real realizado na Barbearia Campo Belo" },
  { src: g1, alt: "Corte fade clássico com acabamento feito na Barbearia Campo Belo" },
  { src: g2, alt: "Corte masculino com barba modelada na Barbearia Campo Belo" },
  { src: g3, alt: "Ferramentas profissionais de barbearia: navalha, tesoura e pente" },
  { src: g4, alt: "Ambiente da Barbearia Campo Belo com cadeiras clássicas" },
  { src: g5, alt: "Toalha quente aplicada no cliente antes da barba" },
  { src: g6, alt: "Detalhe do degradê na nuca finalizado com máquina" },
];

export function Galeria() {
  const [ativa, setAtiva] = useState<number | null>(null);

  return (
    <section id="galeria" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Nosso espaço</p>
            <h2 className="mt-3 text-4xl sm:text-5xl">Galeria</h2>
          </div>
          <ButtonLink
            href={CONTATO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="sm"
          >
            <Instagram className="h-4 w-4" /> Ver no Instagram
          </ButtonLink>
        </Reveal>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {FOTOS.map((foto, i) => (
            <button
              key={foto.src}
              type="button"
              onClick={() => setAtiva(i)}
              aria-label={`Ampliar imagem: ${foto.alt}`}
              className="group relative block w-full overflow-hidden rounded-sm"
            >
              <img
                src={foto.src}
                alt={foto.alt}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-background/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>

      {ativa !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-5"
          role="dialog"
          aria-modal="true"
          onClick={() => setAtiva(null)}
        >
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => setAtiva(null)}
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-sm border border-border text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={FOTOS[ativa]!.src}
            alt={FOTOS[ativa]!.alt}
            className="max-h-[85vh] w-auto max-w-full rounded-sm object-contain"
          />
        </div>
      )}
    </section>
  );
}
