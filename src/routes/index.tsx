import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Hero } from "@/components/sections/Hero";
import { Sobre } from "@/components/sections/Sobre";
import { Servicos } from "@/components/sections/Servicos";
import { Profissionais } from "@/components/sections/Profissionais";
import { Galeria } from "@/components/sections/Galeria";
import { Diferenciais } from "@/components/sections/Diferenciais";
import { Avaliacoes } from "@/components/sections/Avaliacoes";
import { CTA } from "@/components/sections/CTA";
import { Localizacao } from "@/components/sections/Localizacao";

const TITLE = "Barbearia Campo Belo | Cortes, Barba e Estilo";
const DESCRIPTION =
  "Barbearia Campo Belo — cortes masculinos, barba e estilo com atendimento profissional. Conheça nossos serviços e agende seu horário.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HairSalon",
          name: "Barbearia Campo Belo",
          description: DESCRIPTION,
          telephone: "+55 11 97981-9975",
          email: "barbearia.campobelo@gmail.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "R. Otávio Tarquínio de Sousa, 615",
            addressLocality: "São Paulo",
            addressRegion: "SP",
            postalCode: "04613-001",
            addressCountry: "BR",
          },
          sameAs: ["https://www.instagram.com/barbeariacampobelo"],
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "09:00",
              closes: "20:00",
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: "Saturday",
              opens: "09:00",
              closes: "18:00",
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Servicos />
        <Profissionais />
        <Galeria />
        <Diferenciais />
        <Avaliacoes />
        <CTA />
        <Localizacao />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
