import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function parseLocalDate(value: string) {
  if (!value) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day);
}

function formatISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfDay(date: Date) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function monthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function monthKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}`;
}

function getCalendarDays(month: Date) {
  const first = monthStart(month);
  // Monday = 0 ... Sunday = 6
  const leading = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const totalCells = Math.ceil((leading + daysInMonth) / 7) * 7;
  return Array.from({ length: totalCells }, (_, index) => new Date(first.getFullYear(), first.getMonth(), index + 1 - leading));
}

export function CalendarPicker({
  value,
  onChange,
  minDate,
  disableSundays = false,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  minDate?: Date;
  disableSundays?: boolean;
  className?: string;
}) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const effectiveMinDate = startOfDay(minDate ?? today);
  const selected = parseLocalDate(value);
  const [visibleMonth, setVisibleMonth] = useState(() => monthStart(selected ?? today));

  useEffect(() => {
    if (selected) setVisibleMonth(monthStart(selected));
  }, [value]);

  const days = getCalendarDays(visibleMonth);
  const monthLabel = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(visibleMonth);
  const weekdays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  const minMonth = monthStart(effectiveMinDate);
  const canGoPrevious = monthKey(visibleMonth) !== monthKey(minMonth);
  const maxMonth = new Date(today.getFullYear() + 2, 11, 1);
  const canGoNext = visibleMonth < maxMonth;

  const isDisabled = (date: Date) => {
    if (date < effectiveMinDate) return true;
    if (disableSundays && date.getDay() === 0) return true;
    return false;
  };

  return (
    <div className={`calendar-picker rounded-sm border border-border bg-background p-4 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          disabled={!canGoPrevious}
          onClick={() => setVisibleMonth((month) => addMonths(month, -1))}
          aria-label="Mês anterior"
          className="grid h-9 w-9 place-items-center rounded-sm border border-border text-muted-foreground transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-25"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-center">
          <p className="font-display text-xl capitalize tracking-[0.04em]">{monthLabel}</p>
          <p className="text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">Escolha uma data</p>
        </div>
        <button
          type="button"
          disabled={!canGoNext}
          onClick={() => setVisibleMonth((month) => addMonths(month, 1))}
          aria-label="Próximo mês"
          className="grid h-9 w-9 place-items-center rounded-sm border border-border text-muted-foreground transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-25"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1">
        {weekdays.map((day) => (
          <div key={day} className="py-2 text-center text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            {day}
          </div>
        ))}
        {days.map((date) => {
          const outside = date.getMonth() !== visibleMonth.getMonth();
          const disabled = outside || isDisabled(date);
          const selectedDay = selected ? isSameDay(date, selected) : false;
          const todayDay = isSameDay(date, today);

          return (
            <button
              key={formatISODate(date)}
              type="button"
              disabled={disabled}
              onClick={() => onChange(formatISODate(date))}
              className={`relative flex h-10 items-center justify-center rounded-sm text-sm transition focus:outline-none focus:ring-1 focus:ring-primary ${
                selectedDay
                  ? "bg-primary font-semibold text-primary-foreground shadow-red"
                  : disabled
                    ? "cursor-not-allowed text-muted-foreground/25"
                    : "text-foreground hover:bg-primary/10 hover:text-primary"
              } ${outside && !selectedDay ? "opacity-30" : ""}`}
            >
              {date.getDate()}
              {todayDay && !selectedDay && !disabled && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary" />}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-3 text-[0.65rem] text-muted-foreground">
        <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /> Hoje</span>
        <span>Domingos indisponíveis</span>
      </div>
    </div>
  );
}
