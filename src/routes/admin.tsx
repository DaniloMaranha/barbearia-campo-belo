import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { CalendarDays, Check, Clock3, LogOut, Plus, Scissors, Users, X } from "lucide-react";
import { CalendarPicker } from "@/components/CalendarPicker";
import {
  authenticateAdmin,
  addBarber,
  getAdminSession,
  getAppointments,
  getAvailability,
  getBarbers,
  getBusinessHours,
  saveAppointment,
  setAdminSession,
  setBarberActive,
  updateAppointmentStatus,
  type Appointment,
  type Barber,
} from "@/lib/booking";
import { SERVICES } from "@/lib/booking";

export const Route = createFileRoute("/admin")({ component: AdminPage });

const STATUS_LABELS = {
  pending: "Pendente",
  confirmed: "Confirmado",
  in_progress: "Em atendimento",
  completed: "Concluído",
  cancelled: "Cancelado",
} as const;

type AdminTab = "dashboard" | "agenda" | "clientes" | "barbeiros" | "horarios";

function AdminPage() {
  const [session, setSession] = useState(getAdminSession());
  const [active, setActive] = useState<AdminTab>("dashboard");
  const [, refresh] = useState(0);

  if (!session) {
    return <AdminLogin onLogin={(next) => { setAdminSession(next); setSession(next); }} />;
  }

  const appointments = getAppointments();
  const visibleAppointments = session.role === "barber"
    ? appointments.filter((item) => item.barberId === session.barberId)
    : appointments;
  const today = new Date().toISOString().slice(0, 10);
  const todayAppointments = visibleAppointments.filter((item) => item.date === today && item.status !== "cancelled");
  const upcoming = [...visibleAppointments]
    .filter((item) => item.date >= today && item.status !== "cancelled")
    .sort((a, b) => `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`));

  const logout = () => {
    setAdminSession(null);
    setSession(null);
  };

  const tabs: Array<[AdminTab, string]> = session.role === "admin"
    ? [["dashboard", "Dashboard"], ["agenda", "Agenda"], ["clientes", "Clientes"], ["barbeiros", "Barbeiros"], ["horarios", "Horários"]]
    : [["dashboard", "Minha agenda"], ["agenda", "Agenda"], ["clientes", "Clientes"], ["horarios", "Horários"]];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="border-b border-border bg-surface lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
          <div className="p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-primary">Barbearia Campo Belo</p>
            <h1 className="mt-2 text-2xl">Painel</h1>
            <p className="mt-1 text-xs text-muted-foreground">{session.role === "admin" ? "Administrador" : "Barbeiro"}</p>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:px-4">
            {tabs.map(([key, label]) => (
              <button key={key} onClick={() => setActive(key)} className={`whitespace-nowrap px-3 py-2 text-left text-sm ${active === key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"}`}>
                {label}
              </button>
            ))}
          </nav>
          <div className="hidden p-4 lg:block">
            <button onClick={logout} className="flex w-full items-center gap-2 border-t border-border pt-4 text-sm text-muted-foreground hover:text-foreground"><LogOut className="h-4 w-4" /> Sair</button>
          </div>
        </aside>

        <main className="flex-1 p-5 sm:p-8">
          <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="eyebrow">Área restrita</p>
              <h2 className="mt-2 text-3xl sm:text-4xl">Olá, {session.role === "admin" ? "administrador" : session.barberName ?? "barbeiro"}.</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="border border-border px-3 py-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">{session.email}</span>
              <button onClick={logout} className="grid h-10 w-10 place-items-center border border-border lg:hidden"><LogOut className="h-4 w-4" /></button>
            </div>
          </header>

          {active === "dashboard" && <Dashboard appointments={visibleAppointments} todayAppointments={todayAppointments} upcoming={upcoming} />}
          {active === "agenda" && <Agenda appointments={visibleAppointments} session={session} onStatusChange={(id, status) => { updateAppointmentStatus(id, status); refresh((value) => value + 1); }} onCreated={() => refresh((value) => value + 1)} />}
          {active === "clientes" && <Clients appointments={visibleAppointments} />}
          {active === "barbeiros" && session.role === "admin" && <BarbersManager onChanged={() => refresh((value) => value + 1)} />}
          {active === "horarios" && <Hours />}
        </main>
      </div>
    </div>
  );
}

function AdminLogin({ onLogin }: { onLogin: (session: { email: string; role: "admin" | "barber"; barberId?: string; barberName?: string }) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const session = authenticateAdmin(email, password);
    if (session) return onLogin(session);
    setError("E-mail, senha ou usuário inativo. Confira os dados e tente novamente.");
  };

  return (
    <main className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto flex min-h-[85vh] max-w-md items-center">
        <section className="w-full border border-border bg-surface p-8 sm:p-10">
          <p className="eyebrow">Área restrita</p>
          <h1 className="mt-2 text-4xl">Entrar no painel</h1>
          <p className="mt-3 text-sm text-muted-foreground">Acesso exclusivo para proprietário e equipe.</p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <label className="block text-sm">E-mail<input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full border border-border bg-background px-4 py-3" placeholder="seu@email.com" /></label>
            <label className="block text-sm">Senha<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full border border-border bg-background px-4 py-3" placeholder="••••••••" /></label>
            {error && <p className="border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}
            <button className="w-full bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground">Entrar</button>
          </form>
          <div className="mt-6 border-t border-border pt-5 text-xs text-muted-foreground">
            <p>Modo demonstração local:</p>
            <p className="mt-1">Admin: admin@barbeariacampobelo.local / admin123</p>
            <p>Barbeiro inicial: joao@barbeariacampobelo.local / barber123</p>
            <p className="mt-3 text-amber-300">Antes de publicar, substitua este login pelo Supabase Auth.</p>
          </div>
          <Link to="/" className="mt-6 inline-block text-sm text-primary hover:underline">← Voltar ao site</Link>
        </section>
      </div>
    </main>
  );
}

function Dashboard({ appointments, todayAppointments, upcoming }: { appointments: Appointment[]; todayAppointments: Appointment[]; upcoming: Appointment[] }) {
  const confirmed = appointments.filter((item) => item.status === "confirmed").length;
  const cancelled = appointments.filter((item) => item.status === "cancelled").length;
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[[CalendarDays, todayAppointments.length, "Hoje"], [Check, confirmed, "Confirmados"], [X, cancelled, "Cancelados"], [Users, new Set(appointments.map((item) => item.clientPhone.replace(/\D/g, ""))).size, "Clientes"]].map(([Icon, value, label]) => {
          const I = Icon as typeof CalendarDays;
          return <div key={String(label)} className="border border-border bg-surface p-5"><I className="h-5 w-5 text-primary" /><p className="mt-5 font-display text-4xl">{value as number}</p><p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</p></div>;
        })}
      </div>
      <section className="border border-border bg-surface p-5 sm:p-7">
        <div className="flex items-center justify-between"><div><p className="eyebrow">Próximos atendimentos</p><h3 className="mt-2 text-2xl">Agenda</h3></div><Clock3 className="h-5 w-5 text-primary" /></div>
        <div className="mt-6 divide-y divide-border">{upcoming.slice(0, 8).map((item) => <AppointmentRow key={item.id} appointment={item} />)}{!upcoming.length && <p className="py-8 text-center text-sm text-muted-foreground">Nenhum agendamento futuro.</p>}</div>
      </section>
    </div>
  );
}

function Agenda({ appointments, session, onStatusChange, onCreated }: { appointments: Appointment[]; session: ReturnType<typeof getAdminSession>; onStatusChange: (id: string, status: Appointment["status"]) => void; onCreated: () => void }) {
  const allBarbers = getBarbers();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [newOpen, setNewOpen] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [barberId, setBarberId] = useState(session?.role === "barber" ? session.barberId ?? "" : allBarbers.find((item) => item.ativo)?.id ?? "");
  const [serviceId, setServiceId] = useState(SERVICES[0]?.id ?? "");
  const [time, setTime] = useState("");
  const [formError, setFormError] = useState("");
  const service = SERVICES.find((item) => item.id === serviceId);
  const slots = selectedDate && barberId && service ? getAvailability(selectedDate, barberId, service.duracao) : [];
  const dayAppointments = appointments.filter((item) => item.date === selectedDate).sort((a, b) => a.startTime.localeCompare(b.startTime));
  const summary = useMemo(() => ({ total: dayAppointments.length, confirmed: dayAppointments.filter((item) => item.status === "confirmed").length, cancelled: dayAppointments.filter((item) => item.status === "cancelled").length }), [dayAppointments]);

  const createManual = (event: FormEvent) => {
    event.preventDefault();
    setFormError("");
    if (!clientName.trim() || !clientPhone.trim() || !barberId || !serviceId || !time) {
      setFormError("Preencha cliente, WhatsApp, barbeiro, serviço e horário.");
      return;
    }
    const barber = allBarbers.find((item) => item.id === barberId);
    if (!service || !barber) return;
    const [hour, minute] = time.split(":").map(Number);
    const endMinutes = hour * 60 + minute + service.duracao;
    const endTime = `${String(Math.floor(endMinutes / 60)).padStart(2, "0")}:${String(endMinutes % 60).padStart(2, "0")}`;
    try {
      saveAppointment({ clientId: crypto.randomUUID(), clientName: clientName.trim(), clientPhone: clientPhone.trim(), barberId, barberName: barber.nome, serviceId, serviceName: service.nome, date: selectedDate, startTime: time, endTime, status: "confirmed" });
      setNewOpen(false); setClientName(""); setClientPhone(""); setTime(""); onCreated();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Não foi possível criar o agendamento.");
    }
  };

  return <div className="space-y-6">
    <section className="border border-border bg-surface p-5 sm:p-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div><p className="eyebrow">Agenda</p><h3 className="mt-2 text-3xl">Visualização por dia</h3><p className="mt-2 text-sm text-muted-foreground">Consulte os horários marcados e lance atendimentos presenciais ou vindos do WhatsApp.</p></div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="w-full max-w-[360px]">
            <CalendarPicker
              value={selectedDate}
              onChange={(nextDate) => { setSelectedDate(nextDate); setTime(""); }}
              minDate={new Date(2020, 0, 1)}
              className="p-3"
            />
          </div>
          <button onClick={() => setNewOpen((value) => !value)} className="inline-flex h-fit items-center justify-center gap-2 bg-primary px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground"><Plus className="h-4 w-4" /> Novo agendamento</button>
        </div>
      </div>
      {newOpen && <form onSubmit={createManual} className="mt-6 grid gap-3 border border-border bg-background p-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <p className="text-sm font-medium">Data do agendamento</p>
          <div className="mt-2 max-w-md">
            <CalendarPicker
              value={selectedDate}
              onChange={(nextDate) => { setSelectedDate(nextDate); setTime(""); }}
            />
          </div>
        </div>
        <label className="text-sm">Cliente<input value={clientName} onChange={(e) => setClientName(e.target.value)} className="mt-2 w-full border border-border bg-surface px-3 py-2" placeholder="Nome" /></label>
        <label className="text-sm">WhatsApp<input value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} className="mt-2 w-full border border-border bg-surface px-3 py-2" placeholder="(11) 99999-9999" /></label>
        <label className="text-sm">Barbeiro<select value={barberId} disabled={session?.role === "barber"} onChange={(e) => setBarberId(e.target.value)} className="mt-2 w-full border border-border bg-surface px-3 py-2">{allBarbers.filter((item) => item.ativo).map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}</select></label>
        <label className="text-sm">Serviço<select value={serviceId} onChange={(e) => { setServiceId(e.target.value); setTime(""); }} className="mt-2 w-full border border-border bg-surface px-3 py-2">{SERVICES.map((item) => <option key={item.id} value={item.id}>{item.nome} · {item.duracao} min</option>)}</select></label>
        <label className="text-sm md:col-span-2">Horário<select value={time} onChange={(e) => setTime(e.target.value)} className="mt-2 w-full border border-border bg-surface px-3 py-2"><option value="">Selecione um horário disponível</option>{slots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}</select></label>
        {formError && <p className="md:col-span-2 border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">{formError}</p>}
        <div className="md:col-span-2 flex gap-2"><button className="bg-primary px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground">Salvar</button><button type="button" onClick={() => setNewOpen(false)} className="border border-border px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em]">Cancelar</button></div>
      </form>}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">{[[summary.total, "Agendamentos"], [summary.confirmed, "Confirmados"], [summary.cancelled, "Cancelados"]].map(([value, label]) => <div key={String(label)} className="border border-border p-4"><p className="font-display text-3xl">{value}</p><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p></div>)}</div>
    </section>
    <section className="border border-border bg-surface p-5 sm:p-7"><div className="space-y-3">{dayAppointments.map((item) => <div key={item.id} className="border border-border p-4"><div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><AppointmentRow appointment={item} /><div className="flex gap-2"><select value={item.status} onChange={(e) => onStatusChange(item.id, e.target.value as Appointment["status"])} className="border border-border bg-background px-3 py-2 text-xs"><option value="pending">Pendente</option><option value="confirmed">Confirmado</option><option value="in_progress">Em atendimento</option><option value="completed">Concluído</option><option value="cancelled">Cancelado</option></select></div></div></div>)}{!dayAppointments.length && <p className="py-12 text-center text-sm text-muted-foreground">Nenhum agendamento neste dia.</p>}</div></section>
  </div>;
}

function BarbersManager({ onChanged }: { onChanged: () => void }) {
  const [barbers, setBarbers] = useState<Barber[]>(() => getBarbers());
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const reload = () => setBarbers(getBarbers());

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (!name.trim() || !specialty.trim() || !email.trim() || !password.trim()) {
      setError("Preencha nome, especialidade, e-mail e senha.");
      return;
    }
    try {
      addBarber({ nome: name, especialidade: specialty, descricao: description, email, password, ativo: true });
      reload(); onChanged();
      setOpen(false); setName(""); setSpecialty(""); setDescription(""); setEmail(""); setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível cadastrar o barbeiro.");
    }
  };

  const toggle = (barber: Barber) => {
    setBarberActive(barber.id, !barber.ativo);
    reload(); onChanged();
  };

  return <div className="space-y-6">
    <section className="border border-border bg-surface p-5 sm:p-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div><p className="eyebrow">Equipe</p><h3 className="mt-2 text-3xl">Barbeiros cadastrados</h3><p className="mt-2 text-sm text-muted-foreground">Cadastre, ative ou inative profissionais sem alterar o código do site.</p></div>
        <button onClick={() => setOpen((value) => !value)} className="inline-flex items-center justify-center gap-2 bg-primary px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground"><Plus className="h-4 w-4" /> Novo barbeiro</button>
      </div>
      {open && <form onSubmit={submit} className="mt-6 grid gap-3 border border-border bg-background p-5 md:grid-cols-2">
        <label className="text-sm">Nome<input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full border border-border bg-surface px-3 py-2" placeholder="Nome do barbeiro" /></label>
        <label className="text-sm">Especialidade<input value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="mt-2 w-full border border-border bg-surface px-3 py-2" placeholder="Corte masculino & barba" /></label>
        <label className="text-sm md:col-span-2">Descrição<input value={description} onChange={(e) => setDescription(e.target.value)} className="mt-2 w-full border border-border bg-surface px-3 py-2" placeholder="Breve descrição profissional" /></label>
        <label className="text-sm">E-mail de acesso<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full border border-border bg-surface px-3 py-2" placeholder="barbeiro@barbeariacampobelo.local" /></label>
        <label className="text-sm">Senha inicial<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full border border-border bg-surface px-3 py-2" placeholder="Crie uma senha" /></label>
        {error && <p className="md:col-span-2 border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}
        <div className="md:col-span-2 flex gap-2"><button className="bg-primary px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground">Cadastrar</button><button type="button" onClick={() => setOpen(false)} className="border border-border px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em]">Cancelar</button></div>
      </form>}
    </section>

    <section className="grid gap-4 md:grid-cols-2">
      {barbers.map((barber) => (
        <article key={barber.id} className="border border-border bg-surface p-5">
          <div className="flex items-start gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-surface-2 font-display text-2xl text-primary">{barber.nome.charAt(0)}</div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2"><h4 className="text-2xl">{barber.nome}</h4><span className={`border px-2 py-1 text-[0.6rem] uppercase tracking-[0.12em] ${barber.ativo ? "border-primary/40 text-primary" : "border-border text-muted-foreground"}`}>{barber.ativo ? "Ativo" : "Inativo"}</span></div>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-primary">{barber.especialidade}</p>
              <p className="mt-3 text-sm text-muted-foreground">{barber.descricao || "Sem descrição cadastrada."}</p>
              <p className="mt-3 text-xs text-muted-foreground">Login: {barber.email}</p>
              <button onClick={() => toggle(barber)} className="mt-4 border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] hover:border-primary hover:text-primary">{barber.ativo ? "Inativar" : "Reativar"}</button>
            </div>
          </div>
        </article>
      ))}
    </section>
  </div>;
}

function Clients({ appointments }: { appointments: Appointment[] }) {
  const clients = Array.from(new Map(appointments.map((item) => [item.clientPhone.replace(/\D/g, ""), item])).values());
  return <section className="border border-border bg-surface p-5 sm:p-7"><p className="eyebrow">Clientes</p><h3 className="mt-2 text-3xl">Histórico recente</h3><div className="mt-6 divide-y divide-border">{clients.map((item) => <div key={item.clientPhone} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-medium">{item.clientName}</p><p className="text-sm text-muted-foreground">{item.clientPhone}</p></div><div className="text-left sm:text-right"><p className="text-sm">Último agendamento: {item.date.split("-").reverse().join("/")}</p><p className="text-xs uppercase tracking-[0.12em] text-primary">{item.serviceName}</p></div></div>)}{!clients.length && <p className="py-12 text-center text-sm text-muted-foreground">Nenhum cliente cadastrado ainda.</p>}</div></section>;
}

function Hours() {
  const hours = getBusinessHours();
  return <div className="grid gap-6 lg:grid-cols-[1fr_1fr]"><section className="border border-border bg-surface p-5 sm:p-7"><p className="eyebrow">Funcionamento</p><h3 className="mt-2 text-3xl">Horários configurados</h3><div className="mt-6 space-y-2">{hours.map((item) => <div key={item.dayOfWeek} className="flex items-center justify-between border border-border px-4 py-3"><span>{item.label}</span><span className={item.active ? "text-primary" : "text-muted-foreground"}>{item.active ? `${item.open} – ${item.close}` : "Fechado"}</span></div>)}</div></section><section className="border border-border bg-surface p-5 sm:p-7"><p className="eyebrow">Disponibilidade</p><h3 className="mt-2 text-3xl">Agenda por profissional</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Cada barbeiro ativo aparece automaticamente no site público e passa a receber horários no fluxo de agendamento. Nesta versão local, os horários e usuários ainda são armazenados no navegador; o Supabase será a etapa de produção.</p></section></div>;
}

function AppointmentRow({ appointment }: { appointment: Appointment }) {
  return <div className="flex min-w-0 items-center gap-4"><div className="w-20 shrink-0 font-display text-2xl text-primary">{appointment.startTime}</div><div className="min-w-0"><p className="truncate font-medium">{appointment.clientName}</p><p className="text-sm text-muted-foreground">{appointment.serviceName} · {appointment.barberName}</p></div><span className="ml-auto shrink-0 border border-border px-2 py-1 text-[0.62rem] uppercase tracking-[0.12em]">{STATUS_LABELS[appointment.status]}</span></div>;
}
