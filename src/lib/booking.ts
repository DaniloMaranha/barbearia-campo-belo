import { PROFISSIONAIS, SERVICOS } from "@/data/site";

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled";

export type Barber = {
  id: string;
  nome: string;
  especialidade: string;
  descricao?: string;
  foto?: string;
  ativo: boolean;
};

export type BarberAccount = Barber & {
  email: string;
  password: string;
};

export type Service = {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
  duracao: number;
};

export type Client = {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  createdAt: string;
};

export type Appointment = {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  barberId: string;
  barberName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
};

export type BusinessHours = {
  dayOfWeek: number;
  label: string;
  open: string;
  close: string;
  active: boolean;
};

type StoredBlocked = { id: string; date: string; barberId?: string; startTime: string; endTime: string; reason: string };

const KEYS = {
  barbers: "bcb_barbers_v2",
  appointments: "bcb_appointments_v1",
  clients: "bcb_clients_v1",
  businessHours: "bcb_business_hours_v1",
  blocked: "bcb_blocked_v1",
  session: "bcb_admin_session_v1",
};

const DEFAULT_BARBERS: BarberAccount[] = PROFISSIONAIS.map((barber, index) => ({
  id: `barber-${index + 1}`,
  nome: barber.nome,
  especialidade: barber.especialidade,
  descricao: barber.descricao,
  foto: barber.foto,
  ativo: true,
  email: index === 1 ? "joao@barbeariacampobelo.local" : "matty@barbeariacampobelo.local",
  password: index === 1 ? "barber123" : "barber123",
}));

export const BARBERS: Barber[] = DEFAULT_BARBERS.map(({ email: _email, password: _password, ...barber }) => barber);

export const SERVICES: Service[] = SERVICOS.map((service, index) => ({
  id: `service-${index + 1}`,
  nome: service.nome,
  descricao: service.descricao,
  preco: service.preco,
  duracao: service.nome === "Corte + Barba" ? 60 : service.nome === "Corte de Cabelo" ? 40 : 30,
}));

export const DEFAULT_BUSINESS_HOURS: BusinessHours[] = [
  { dayOfWeek: 1, label: "Segunda", open: "09:00", close: "20:00", active: true },
  { dayOfWeek: 2, label: "Terça", open: "09:00", close: "20:00", active: true },
  { dayOfWeek: 3, label: "Quarta", open: "09:00", close: "20:00", active: true },
  { dayOfWeek: 4, label: "Quinta", open: "09:00", close: "20:00", active: true },
  { dayOfWeek: 5, label: "Sexta", open: "09:00", close: "20:00", active: true },
  { dayOfWeek: 6, label: "Sábado", open: "09:00", close: "18:00", active: true },
  { dayOfWeek: 0, label: "Domingo", open: "09:00", close: "18:00", active: false },
];

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getBarberAccounts(): BarberAccount[] {
  return read<BarberAccount[]>(KEYS.barbers, DEFAULT_BARBERS);
}

export function getBarbers(): Barber[] {
  return getBarberAccounts().map(({ email: _email, password: _password, ...barber }) => barber);
}

export function addBarber(input: Omit<BarberAccount, "id">): BarberAccount {
  const current = getBarberAccounts();
  const email = input.email.trim().toLowerCase();
  if (current.some((barber) => barber.email.toLowerCase() === email)) {
    throw new Error("Já existe um usuário com este e-mail.");
  }

  const barber: BarberAccount = {
    ...input,
    email,
    id: crypto.randomUUID(),
    nome: input.nome.trim(),
    especialidade: input.especialidade.trim(),
    descricao: input.descricao?.trim() || undefined,
    password: input.password,
  };

  write(KEYS.barbers, [...current, barber]);
  return barber;
}

export function updateBarber(id: string, changes: Partial<Omit<BarberAccount, "id">>): BarberAccount {
  const current = getBarberAccounts();
  let updated: BarberAccount | undefined;
  const next = current.map((barber) => {
    if (barber.id !== id) return barber;
    updated = {
      ...barber,
      ...changes,
      email: changes.email?.trim().toLowerCase() ?? barber.email,
      nome: changes.nome?.trim() ?? barber.nome,
      especialidade: changes.especialidade?.trim() ?? barber.especialidade,
      descricao: changes.descricao?.trim() || barber.descricao,
    };
    return updated;
  });

  if (!updated) throw new Error("Barbeiro não encontrado.");
  if (next.some((barber) => barber.id !== id && barber.email.toLowerCase() === updated!.email.toLowerCase())) {
    throw new Error("Já existe outro usuário com este e-mail.");
  }

  write(KEYS.barbers, next);
  return updated;
}

export function setBarberActive(id: string, active: boolean) {
  updateBarber(id, { ativo: active });
}

export function authenticateAdmin(email: string, password: string) {
  if (email.trim().toLowerCase() === "admin@barbeariacampobelo.local" && password === "admin123") {
    return { email: email.trim().toLowerCase(), role: "admin" as const };
  }

  const barber = getBarberAccounts().find(
    (item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password && item.ativo,
  );
  if (barber) {
    return { email: barber.email, role: "barber" as const, barberId: barber.id, barberName: barber.nome };
  }

  return null;
}

export function getAppointments(): Appointment[] {
  return read<Appointment[]>(KEYS.appointments, []);
}

export function saveAppointment(input: Omit<Appointment, "id" | "createdAt">): Appointment {
  const current = getAppointments();
  const conflict = current.some(
    (appointment) =>
      appointment.status !== "cancelled" &&
      appointment.date === input.date &&
      appointment.barberId === input.barberId &&
      appointment.startTime === input.startTime,
  );

  if (conflict) throw new Error("Este horário acabou de ser reservado. Escolha outro horário.");

  const appointment: Appointment = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  write(KEYS.appointments, [appointment, ...current]);
  upsertClient(input.clientName, input.clientPhone);
  return appointment;
}

export function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  write(KEYS.appointments, getAppointments().map((appointment) => (appointment.id === id ? { ...appointment, status } : appointment)));
}

export function deleteAppointment(id: string) {
  write(KEYS.appointments, getAppointments().filter((appointment) => appointment.id !== id));
}

export function getClients(): Client[] {
  return read<Client[]>(KEYS.clients, []);
}

export function upsertClient(nome: string, telefone: string, email?: string) {
  const normalized = telefone.replace(/\D/g, "");
  const current = getClients();
  const existing = current.find((client) => client.telefone.replace(/\D/g, "") === normalized);
  if (existing) {
    write(KEYS.clients, current.map((client) => (client.id === existing.id ? { ...client, nome, email: email ?? client.email } : client)));
    return existing;
  }
  const client: Client = { id: crypto.randomUUID(), nome, telefone, email, createdAt: new Date().toISOString() };
  write(KEYS.clients, [client, ...current]);
  return client;
}

export function getBusinessHours(): BusinessHours[] {
  return read<BusinessHours[]>(KEYS.businessHours, DEFAULT_BUSINESS_HOURS);
}

export function setBusinessHours(hours: BusinessHours[]) {
  write(KEYS.businessHours, hours);
}

export function getBlockedTimes(): StoredBlocked[] {
  return read<StoredBlocked[]>(KEYS.blocked, []);
}

export function addBlockedTime(blocked: Omit<StoredBlocked, "id">) {
  const next = { ...blocked, id: crypto.randomUUID() };
  write(KEYS.blocked, [next, ...getBlockedTimes()]);
  return next;
}

export function removeBlockedTime(id: string) {
  write(KEYS.blocked, getBlockedTimes().filter((item) => item.id !== id));
}

export function getAdminSession() {
  return read<{ email: string; role: "admin" | "barber"; barberId?: string; barberName?: string } | null>(KEYS.session, null);
}

export function setAdminSession(session: { email: string; role: "admin" | "barber"; barberId?: string; barberName?: string } | null) {
  if (session) write(KEYS.session, session);
  else if (typeof window !== "undefined") window.localStorage.removeItem(KEYS.session);
}

export function getAvailability(date: string, barberId: string, duration: number) {
  const localDate = new Date(`${date}T12:00:00`);
  const day = localDate.getDay();
  const business = getBusinessHours().find((item) => item.dayOfWeek === day);
  if (!business?.active) return [] as string[];

  const toMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };
  const fromMinutes = (minutes: number) => `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

  const open = toMinutes(business.open);
  const close = toMinutes(business.close);
  const appointments = getAppointments().filter((item) => item.date === date && item.barberId === barberId && item.status !== "cancelled");
  const blocks = getBlockedTimes().filter((item) => item.date === date && (!item.barberId || item.barberId === barberId));

  const slots: string[] = [];
  for (let start = open; start + duration <= close; start += 30) {
    const end = start + duration;
    const appointmentConflict = appointments.some((item) => {
      const itemStart = toMinutes(item.startTime);
      const itemEnd = toMinutes(item.endTime);
      return start < itemEnd && end > itemStart;
    });
    const blockedConflict = blocks.some((item) => {
      const itemStart = toMinutes(item.startTime);
      const itemEnd = toMinutes(item.endTime);
      return start < itemEnd && end > itemStart;
    });
    if (!appointmentConflict && !blockedConflict) slots.push(fromMinutes(start));
  }
  return slots;
}
