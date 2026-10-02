import { Reveal } from "@/components/Reveal";
import { Link } from "@tanstack/react-router";
import g4 from "@/assets/g4.jpg";

export function CTA() {
  return (
    <section className="relative isolate overflow-hidden py-24 lg:py-32">
      <img
        src={g4}
        alt="Ambiente da Barbearia Campo Belo"
        width={1200}
        height={900}
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-background/85" />
      <Reveal className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h2 className="text-4xl leading-tight sm:text-6xl">
          Pronto para <span className="text-primary">renovar o visual?</span>
        </h2>
        <p className="mt-5 text-sm text-foreground/75 sm:text-lg">
          Agende seu horário na Barbearia Campo Belo.
        </p>
        <Link
          to="/agendar"
          className="mt-9 inline-flex items-center justify-center rounded-sm bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-accent"
        >
          Agendar horário
        </Link>
      </Reveal>
    </section>
  );
}
