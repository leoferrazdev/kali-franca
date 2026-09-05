type ElevaCalendarProps = {
  referenceDate: string;
  completedDates?: readonly string[];
};

const weekdayFormatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'short', timeZone: 'UTC' });

function buildDays(referenceDate: string) {
  const reference = new Date(`${referenceDate}T12:00:00.000Z`);
  reference.setUTCDate(reference.getUTCDate() - 3);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(reference);
    date.setUTCDate(reference.getUTCDate() + index);
    return {
      key: date.toISOString().slice(0, 10),
      label: weekdayFormatter.format(date).replace('.', ''),
      day: date.getUTCDate(),
    };
  });
}

export function ElevaCalendar({ referenceDate, completedDates = [] }: ElevaCalendarProps) {
  const days = buildDays(referenceDate);

  return (
    <section className="eleva-calendar" aria-labelledby="eleva-calendar-title">
      <div className="eleva-section-heading">
        <div>
          <p className="eyebrow">Ritmo de presença</p>
          <h2 id="eleva-calendar-title">Calendário de frequência</h2>
        </div>
        <span className="eleva-calendar__legend"><span aria-hidden="true" /> concluído</span>
      </div>
      <ol className="eleva-calendar__days">
        {days.map((day) => {
          const completed = completedDates.includes(day.key);
          const current = day.key === referenceDate;
          return (
            <li className={`eleva-calendar__day${completed ? ' eleva-calendar__day--completed' : ''}${current ? ' eleva-calendar__day--current' : ''}`} key={day.key}>
              <span>{day.label}</span>
              <strong>{day.day}</strong>
              <span className="eleva-calendar__dot" aria-label={completed ? 'Atividade concluída' : 'Sem atividade concluída'} />
            </li>
          );
        })}
      </ol>
    </section>
  );
}
