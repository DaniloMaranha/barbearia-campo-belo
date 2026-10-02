// =====================================================================
// CONFIGURAÇÕES DA BARBEARIA — edite aqui para atualizar o site inteiro
// =====================================================================

export const CONTATO = {
  nome: "Barbearia Campo Belo",
  telefone: "(11) 97981-9975",
  whatsapp: "5511979819975", // somente números, com DDI
  email: "barbearia.campobelo@gmail.com",
  instagram: "https://www.instagram.com/barbeariacampobelo",
  instagramHandle: "@barbeariacampobelo",
  endereco: "R. Otávio Tarquínio de Sousa, 615",
  bairro: "Campo Belo · São Paulo · SP · 04613-001",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=R.+Ot%C3%A1vio+Tarqu%C3%ADnio+de+Sousa,+615+-+Campo+Belo,+S%C3%A3o+Paulo",
  mapsEmbed:
    "https://www.google.com/maps?q=R.+Ot%C3%A1vio+Tarqu%C3%ADnio+de+Sousa,+615,+Campo+Belo,+S%C3%A3o+Paulo&output=embed",
};

export const HORARIOS = [
  { dia: "Segunda a Sexta", horario: "9h às 20h" },
  { dia: "Sábado", horario: "9h às 18h" },
  { dia: "Domingo", horario: "Fechado" },
];

export const MENSAGEM_AGENDAMENTO =
  "Olá! Gostaria de agendar um horário na Barbearia Campo Belo.";

// Agendamento agora acontece dentro do próprio site.
export const LINK_AGENDAMENTO = "/agendar";

export const agendarCom = (_texto: string) => "/agendar";

export const NUMEROS = [
  { valor: "7+", label: "Anos de experiência" },
  { valor: "500+", label: "Clientes atendidos" },
  { valor: "4.8★", label: "Avaliação no Google" },
];

export const SERVICOS = [
  {
    nome: "Corte de Cabelo",
    descricao:
      "Corte personalizado com acabamento perfeito. Do clássico ao moderno, do jeito que você quer.",
    preco: "Consultar",
    icone: "scissors" as const,
  },
  {
    nome: "Barba",
    descricao:
      "Modelagem, aparagem e navalha. Barba feita com detalhe e cuidado para o seu rosto.",
    preco: "Consultar",
    icone: "razor" as const,
  },
  {
    nome: "Corte + Barba",
    descricao:
      "O combo completo. Saia com o visual renovado do cabelo à barba, num atendimento só.",
    preco: "Consultar",
    icone: "crown" as const,
    destaque: "Mais pedido",
  },
  {
    nome: "Sobrancelha",
    descricao:
      "Design e alinhamento de sobrancelha masculina para um visual mais limpo e definido.",
    preco: "Consultar",
    icone: "eye" as const,
  },
  {
    nome: "Corte Infantil",
    descricao: "Atendimento com paciência e cuidado especial para as crianças.",
    preco: "Consultar",
    icone: "child" as const,
  },
];

// Adicione ou remova profissionais livremente. `foto` é opcional (usa iniciais).
export const PROFISSIONAIS: {
  nome: string;
  especialidade: string;
  descricao: string;
  foto?: string;
}[] = [
  {
    nome: "Matty",
    especialidade: "Corte masculino & barba",
    descricao:
      "Referência no Campo Belo, com anos de cadeira e um acabamento que virou marca registrada da casa.",
  },
  {
    nome: "João",
    especialidade: "Corte & navalha",
    descricao:
      "Formado dentro da barbearia, une técnica clássica com as tendências mais atuais.",
  },
];

// Avaliações reais publicadas no Google.
export const AVALIACOES = [
  {
    nome: "Leandro Message",
    fonte: "Local Guide · 31 avaliações",
    nota: 5,
    texto:
      "Fui pela 1ª vez hoje, além do Matty ser um ótimo profissional, tive a oportunidade de trocar uma ideia com ícones do bairro que estão sempre lá. Dei muita risada!",
  },
  {
    nome: "Daniel Lima",
    fonte: "Google Reviews",
    nota: 5,
    texto:
      "Matty é um barbeiro exemplar e muito profissional, corto há anos aqui e não troco por nada. O João corta bem demais. Ambiente agradável.",
  },
  {
    nome: "Wagner Levi",
    fonte: "Local Guide · 85 avaliações",
    nota: 5,
    texto: "Atendimento ímpar! Profissionais da mais alta habilidade! RE-CO-MEN-DO!!",
  },
  {
    nome: "Cliente Google",
    fonte: "Google Reviews",
    nota: 5,
    texto:
      "Um ambiente maravilhoso, decoração muito bonita e ótimas músicas. Ótimo corte de barba.",
  },
];

export const MENU = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Profissionais", href: "#profissionais" },
  { label: "Galeria", href: "#galeria" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "Contato", href: "#contato" },
];
