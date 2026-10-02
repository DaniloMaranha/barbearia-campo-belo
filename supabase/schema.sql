-- Schema base para produção com Supabase/PostgreSQL.
-- Execute no SQL Editor do Supabase e substitua o armazenamento local do protótipo
-- pelos serviços de leitura/escrita autenticados antes de publicar a área administrativa.

create table if not exists public.barbers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  specialty text,
  description text,
  photo text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'barber' check (role in ('admin', 'barber')),
  barber_id uuid unique references public.barbers(id) on delete set null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  duration_minutes integer not null default 30,
  price numeric(10,2),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  barber_id uuid not null references public.barbers(id),
  service_id uuid not null references public.services(id),
  appointment_date date not null,
  start_time time not null,
  end_time time not null,
  status text not null default 'confirmed' check (status in ('pending','confirmed','in_progress','completed','cancelled')),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.business_hours (
  id uuid primary key default gen_random_uuid(),
  day_of_week integer not null check (day_of_week between 0 and 6),
  open_time time,
  close_time time,
  break_start time,
  break_end time,
  active boolean not null default true
);

create table if not exists public.blocked_times (
  id uuid primary key default gen_random_uuid(),
  barber_id uuid references public.barbers(id),
  blocked_date date not null,
  start_time time not null,
  end_time time not null,
  reason text,
  created_at timestamptz not null default now()
);

create index if not exists appointments_date_idx on public.appointments(appointment_date);
create index if not exists appointments_barber_idx on public.appointments(barber_id);
create index if not exists profiles_barber_idx on public.profiles(barber_id);

-- A aplicação deve validar conflitos também no servidor antes de inserir.
-- Em produção, habilite RLS e crie policies separando administrador e barbeiro.
-- O perfil 'barber' deve conseguir ler/alterar apenas os próprios atendimentos.
-- O perfil 'admin' deve conseguir gerenciar barbeiros, serviços, horários e agenda.
