# 💈 Barbearia Campo Belo

Site institucional e sistema de agendamento desenvolvido para a Barbearia Campo Belo.

O projeto combina uma experiência pública para clientes com uma área administrativa para gerenciamento de agendamentos, barbeiros, serviços e horários.

---

## 📌 Sobre o projeto

O projeto foi desenvolvido para modernizar a presença digital da Barbearia Campo Belo e facilitar o processo de agendamento.

O sistema possui duas áreas principais:

- **Site público** — apresentação da barbearia e agendamento online.
- **Área administrativa** — gerenciamento de agenda e informações da barbearia.

---

## 🚀 Funcionalidades

### 🌐 Site público

- Página institucional da Barbearia Campo Belo
- Design responsivo
- Fotos reais da barbearia
- Apresentação dos serviços
- Apresentação dos profissionais
- Galeria de cortes e ambiente
- Avaliações
- Localização
- Integração com WhatsApp
- SEO básico

### 📅 Agendamento online

O cliente consegue:

1. Escolher o serviço
2. Escolher o barbeiro
3. Escolher a data
4. Visualizar horários disponíveis
5. Informar seus dados
6. Confirmar o agendamento

Após a confirmação, o sistema apresenta a opção de contato via WhatsApp da barbearia com os dados do agendamento.

### 🔐 Área administrativa

A aplicação possui uma área restrita em:

`/admin`

Com funcionalidades para:

- Login
- Dashboard
- Agenda
- Visualização de agendamentos
- Cadastro de barbeiros
- Ativação/inativação de profissionais
- Cadastro de serviços
- Controle de horários
- Cadastro manual de agendamentos
- Visualização de clientes
- Diferentes níveis de acesso

### 👤 Perfis

**Administrador**
- Visualiza todos os agendamentos
- Gerencia barbeiros
- Gerencia serviços
- Gerencia horários
- Gerencia clientes

**Barbeiro**
- Visualiza sua agenda
- Visualiza seus atendimentos
- Gerencia o status dos seus atendimentos

---

## 🛠️ Tecnologias utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- TanStack Router
- React Query
- Supabase / PostgreSQL
- Lucide React

---

## 📂 Estrutura

```text
src/
├── components/
│   ├── sections/
│   ├── admin/
│   └── booking/
├── routes/
│   ├── index.tsx
│   ├── agendar.tsx
│   └── admin.tsx
├── data/
├── hooks/
├── lib/
└── assets/

public/
