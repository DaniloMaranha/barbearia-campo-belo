import { motion } from "framer-motion";
import { ButtonLink } from "@/components/Button";
import { NUMEROS } from "@/data/site";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section id="inicio" className="relative isolate min-h-[100svh] overflow-hidden">
      <img
        src={heroImg}
        alt="Fachada real da Barbearia Campo Belo, em Campo Belo, São Paulo"
        width={1920}
        height={1280}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="overlay-hero absolute inset-0 -z-10" />

      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 lg:px-8 lg:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow"
        >
          Est. Campo Belo · São Paulo
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 max-w-4xl text-5xl leading-[0.95] sm:text-7xl lg:text-8xl"
        >
          Seu estilo <span className="text-primary">começa aqui.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-5 max-w-xl text-base text-foreground/75 sm:text-lg"
        >
          Cortes, barba e estilo em um ambiente pensado para você.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            to="/agendar"
            className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-accent"
          >
            Agendar horário
          </Link>
          <ButtonLink href="#sobre" variant="outline" size="lg">
            Conhecer a barbearia
          </ButtonLink>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-14 grid grid-cols-3 gap-4 border-t border-border pt-7"
        >
          {NUMEROS.map((n) => (
            <div key={n.label}>
              <dt className="font-display text-3xl text-primary sm:text-4xl">
                {n.valor}
              </dt>
              <dd className="mt-1 text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground sm:text-xs">
                {n.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
