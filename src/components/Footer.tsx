import { Instagram, MessageCircle, MapPin, Clock } from "lucide-react";
import { CONTATO, HORARIOS, MENU } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-1">
          <p className="font-display text-2xl tracking-wider">Barbearia Campo Belo</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Cortes, barba e estilo com atendimento profissional no coração do Campo Belo.
          </p>
        </div>

        <div>
          <p className="eyebrow">Navegação</p>
          <ul className="mt-4 space-y-2">
            {MENU.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Onde estamos</p>
          <p className="mt-4 flex gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>
              {CONTATO.endereco}
              <br />
              {CONTATO.bairro}
            </span>
          </p>
          <p className="mt-4 flex gap-2 text-sm text-muted-foreground">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>
              {HORARIOS.map((h) => (
                <span key={h.dia} className="block">
                  {h.dia}: {h.horario}
                </span>
              ))}
            </span>
          </p>
        </div>

        <div>
          <p className="eyebrow">Contato</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
            <a
              href={`https://wa.me/${CONTATO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <MessageCircle className="h-4 w-4 text-primary" /> {CONTATO.telefone}
            </a>
            <a
              href={CONTATO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Instagram className="h-4 w-4 text-primary" /> {CONTATO.instagramHandle}
            </a>
            <a
              href={`mailto:${CONTATO.email}`}
              className="transition-colors hover:text-primary"
            >
              {CONTATO.email}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © 2026 Barbearia Campo Belo. Todos os direitos reservados.
      </div>
    </footer>
  );
}
