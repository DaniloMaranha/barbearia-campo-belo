import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, ChevronRight, Clock, Scissors } from "lucide-react";
import { CalendarPicker } from "@/components/CalendarPicker";
import { SERVICES, getAvailability, getBarbers, saveAppointment, type Barber } from "@/lib/booking";
import { CONTATO } from "@/data/site";

export const Route = createFileRoute("/agendar")({ component: AgendarPage });

type Step = 1 | 2 | 3 | 4;

function AgendarPage() {
  const [step, setStep] = useState<Step>(1);
  const [barbers, setBarbers] = useState<Barber[]>(() => getBarbers().filter((item) => item.ativo));
  const [serviceId, setServiceId] = useState("");
  const [barberId, setBarberId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const sync = () => setBarbers(getBarbers().filter((item) => item.ativo));
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const service = SERVICES.find((item) => item.id === serviceId);
  const barber = barbers.find((item) => item.id === barberId);
  const availability = useMemo(
    () => (date && barberId && service ? getAvailability(date, barberId, service.duracao) : []),
    [date, barberId, service],
  );

  const next = () => {
    setError("");
    if (step === 1 && !serviceId) return setError("Escolha um serviço.");
    if (step === 2 && !barberId) return setError("Escolha um profissional.");
    if (step === 3 && (!date || !time)) return setError("Escolha uma data e um horário.");
    if (step === 4) {
      if (!name.trim() || !phone.trim()) return setError("Informe seu nome e WhatsApp.");
      try {
        const [hour, minute] = time.split(":").map(Number);
        const endMinutes = hour * 60 + minute + (service?.duracao ?? 30);
        const endTime = `${String(Math.floor(endMinutes / 60)).padStart(2, "0")}:${String(endMinutes % 60).padStart(2, "0")}`;
        saveAppointment({
          clientId: crypto.randomUUID(),
          clientName: name.trim(),
          clientPhone: phone.trim(),
          barberId,
          barberName: barber?.nome ?? "Profissional",
          serviceId,
          serviceName: service?.nome ?? "Serviço",
          date,
          startTime: time,
          endTime,
          status: "confirmed",
          notes: email.trim() ? `E-mail: ${email.trim()}` : undefined,
        });
        setCompleted(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Não foi possível salvar o agendamento.");
      }
      return;
    }
    setStep((current) => (current + 1) as Step);
  };

  const whatsappMessage = completed
    ? `Olá! Acabei de realizar um agendamento pelo site da Barbearia Campo Belo.\n\nCliente: ${name}\nServiço: ${service?.nome}\nProfissional: ${barber?.nome}\nData: ${date}\nHorário: ${time}`
    : "";

  if (completed) {
    return (
      <main className="min-h-screen bg-background px-5 py-12 text-foreground">
        <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center">
          <section className="w-full border border-border bg-surface p-8 text-center shadow-xl sm:p-12">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-8 w-8" />
            </div>
            <p className="eyebrow mt-6">Tudo certo</p>
            <h1 className="mt-3 text-4xl">Horário reservado.</h1>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Seu agendamento foi registrado neste dispositivo. Para avisar a equipe, envie os detalhes pelo WhatsApp.
            </p>
            <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
              {[
                ["Serviço", service?.nome],
                ["Profissional", barber?.nome],
                ["Data", date.split("-").reverse().join("/")],
                ["Horário", time],
              ].map(([label, value]) => (
                <div key={label} className="border border-border p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
                  <p className="mt-1 font-medium">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={`https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-sm bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground"
              >
                Avisar pelo WhatsApp
              </a>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-sm border border-border px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em]"
              >
                Voltar ao site
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-5 py-8 text-foreground sm:py-12">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Voltar para o site
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <section className="border border-border bg-surface p-6 sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Agendamento</p>
                <h1 className="mt-2 text-4xl sm:text-5xl">Reserve seu horário.</h1>
                <p className="mt-3 max-w-xl text-muted-foreground">Escolha seu serviço, profissional e um horário disponível.</p>
              </div>
              <div className="hidden h-12 w-12 place-items-center rounded-sm bg-primary/10 text-primary sm:grid">
                <Scissors />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-4 border-y border-border">
              {["Serviço", "Profissional", "Data", "Dados"].map((label, index) => (
                <div key={label} className={`px-2 py-3 text-center text-[0.62rem] uppercase tracking-[0.12em] ${step === index + 1 ? "text-primary" : "text-muted-foreground"}`}>
                  {index + 1}. {label}
                </div>
              ))}
            </div>

            <div className="mt-8">
              {step === 1 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {SERVICES.map((item) => (
                    <button key={item.id} type="button" onClick={() => setServiceId(item.id)} className={`text-left border p-5 transition ${serviceId === item.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/60"}`}>
                      <div className="flex items-center justify-between gap-4"><h2 className="text-xl">{item.nome}</h2><Clock className="h-4 w-4 text-primary" /></div>
                      <p className="mt-2 text-sm text-muted-foreground">{item.descricao}</p>
                      <p className="mt-4 text-sm font-semibold">{item.preco} · {item.duracao} min</p>
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {barbers.filter((item) => item.ativo).map((item) => (
                    <button key={item.id} type="button" onClick={() => setBarberId(item.id)} className={`text-left border p-5 transition ${barberId === item.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/60"}`}>
                      <div className="flex items-center gap-4">
                        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-surface-2 font-display text-xl text-primary">{item.nome.charAt(0)}</div>
                        <div><h2 className="text-xl">{item.nome}</h2><p className="text-xs uppercase tracking-[0.14em] text-primary">{item.especialidade}</p></div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium">Escolha a data</p>
                    <div className="mt-3">
                      <CalendarPicker
                        value={date}
                        onChange={(nextDate) => {
                          setDate(nextDate);
                          setTime("");
                        }}
                        disableSundays
                      />
                    </div>
                  </div>
                  {date && <div><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-sm font-medium">Horários disponíveis em {date.split("-").reverse().join("/")}</p><span className="text-xs uppercase tracking-[0.12em] text-primary">{availability.length} {availability.length === 1 ? "horário" : "horários"}</span></div><div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">{availability.length ? availability.map((slot) => <button key={slot} type="button" onClick={() => setTime(slot)} className={`border px-3 py-3 text-sm transition ${time === slot ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>{slot}</button>) : <p className="col-span-full rounded-sm border border-border p-4 text-sm text-muted-foreground">Não há horários disponíveis para esta data.</p>}</div></div>}
                </div>
              )}

              {step === 4 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-medium">Nome<input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full border border-border bg-background px-4 py-3" placeholder="Seu nome" /></label>
                  <label className="text-sm font-medium">WhatsApp<input value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-2 w-full border border-border bg-background px-4 py-3" placeholder="(11) 99999-9999" /></label>
                  <label className="text-sm font-medium sm:col-span-2">E-mail <span className="text-muted-foreground">(opcional)</span><input value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full border border-border bg-background px-4 py-3" placeholder="voce@email.com" /></label>
                </div>
              )}

              {error && <p className="mt-6 border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button type="button" disabled={step === 1} onClick={() => setStep((current) => (current - 1) as Step)} className="border border-border px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] disabled:cursor-not-allowed disabled:opacity-40">Voltar</button>
                <button type="button" onClick={next} className="inline-flex items-center justify-center gap-2 bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground">{step === 4 ? "Confirmar agendamento" : "Continuar"}<ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
          </section>

          <aside className="h-fit border border-border bg-surface p-6 lg:sticky lg:top-8">
            <p className="eyebrow">Seu horário</p>
            <h2 className="mt-2 text-2xl">Resumo</h2>
            <div className="mt-6 space-y-4 text-sm">
              {[['Serviço', service?.nome], ['Profissional', barber?.nome], ['Data', date ? date.split("-").reverse().join("/") : "A escolher"], ['Horário', time || "A escolher"]].map(([label, value]) => <div key={label} className="border-b border-border pb-3"><p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</p><p className="mt-1 font-medium">{value ?? "A escolher"}</p></div>)}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
