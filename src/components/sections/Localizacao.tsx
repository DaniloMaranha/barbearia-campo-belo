import { MapPin, Clock, Phone, Instagram, Mail } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";
import { CONTATO, HORARIOS } from "@/data/site";

export function Localizacao() {
  return (
    <section id="contato" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Onde estamos</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Venha nos visitar</h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <Reveal>
              <div className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em]">Endereço</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {CONTATO.endereco}
                    <br />
                    {CONTATO.bairro}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex gap-4">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em]">
                    Horário de atendimento
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {HORARIOS.map((h) => (
                      <li key={h.dia}>
                        {h.dia}: <span className="text-foreground">{h.horario}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="flex gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em]">Contato</p>
                  <div className="mt-2 flex flex-col gap-2 text-sm text-muted-foreground">
                    <a
                      href={`https://wa.me/${CONTATO.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-primary"
                    >
                      {CONTATO.telefone} · WhatsApp
                    </a>
                    <a
                      href={CONTATO.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 transition-colors hover:text-primary"
                    >
                      <Instagram className="h-4 w-4" /> {CONTATO.instagramHandle}
                    </a>
                    <a
                      href={`mailto:${CONTATO.email}`}
                      className="flex items-center gap-2 transition-colors hover:text-primary"
                    >
                      <Mail className="h-4 w-4" /> {CONTATO.email}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href={CONTATO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                >
                  Abrir no Google Maps
                </ButtonLink>
                <a
                  href="/agendar"
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-accent"
                >
                  Agendar horário
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="h-[380px] overflow-hidden rounded-sm border border-border lg:h-full lg:min-h-[420px]">
              <iframe
                title="Mapa da Barbearia Campo Belo"
                src={CONTATO.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
                style={{ border: 0, filter: "grayscale(0.6) contrast(1.1) brightness(0.85)" }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
