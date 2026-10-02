import { MessageCircle } from "lucide-react";
import { CONTATO } from "@/data/site";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent("Olá! Gostaria de falar com a Barbearia Campo Belo.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Barbearia pelo WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-background shadow-lg transition-transform duration-300 hover:scale-110"
    >
      <MessageCircle className="h-7 w-7" strokeWidth={2} />
      <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-sm bg-surface-2 px-3 py-2 text-xs font-semibold text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
        Fale com a Barbearia
      </span>
    </a>
  );
}
