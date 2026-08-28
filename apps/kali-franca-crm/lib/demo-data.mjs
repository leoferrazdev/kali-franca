export const FUNNEL_STATES = [
  { key: 'novo', label: 'Novo' },
  { key: 'qualificando', label: 'Qualificando' },
  { key: 'oferta', label: 'Oferta' },
  { key: 'ganho', label: 'Ganho' },
  { key: 'perdido', label: 'Perdido' },
];

export const demoLeads = [
  { id: 'L-001', name: 'Ana Martins', state: 'novo', createdAt: '2026-08-13T09:00:00-03:00' },
  { id: 'L-002', name: 'Bruno Vieira', state: 'qualificando', createdAt: '2026-08-12T09:00:00-03:00' },
  { id: 'L-003', name: 'Carla Mendes', state: 'oferta', createdAt: '2026-08-13T10:00:00-03:00', offerAt: '2026-08-13T10:30:00-03:00' },
  { id: 'L-004', name: 'Diego Costa', state: 'ganho', createdAt: '2026-08-13T08:00:00-03:00', conversionAt: '2026-08-13T11:00:00-03:00' },
  { id: 'L-005', name: 'Elisa Rocha', state: 'perdido', createdAt: '2026-08-13T07:00:00-03:00', lostAt: '2026-08-13T12:00:00-03:00' },
  { id: 'L-006', name: 'Felipe Andrade', state: 'qualificando', createdAt: '2026-08-12T14:00:00-03:00' },
  { id: 'L-007', name: 'Gabriela Nunes', state: 'novo', createdAt: '2026-08-13T13:00:00-03:00' },
  { id: 'L-008', name: 'Henrique Souza', state: 'oferta', createdAt: '2026-08-11T11:00:00-03:00', offerAt: '2026-08-13T09:40:00-03:00' },
];

export const demoTasks = [
  { id: 'T-001', dueAt: '2026-08-13T14:00:00-03:00', done: false },
  { id: 'T-002', dueAt: '2026-08-13T16:30:00-03:00', done: false },
  { id: 'T-003', dueAt: '2026-08-13T18:00:00-03:00', done: false },
  { id: 'T-004', dueAt: '2026-08-12T15:00:00-03:00', done: true },
];

function dayKey(date) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(date);
}

export function getTodayMetrics(leads, tasks, now = new Date()) {
  const today = dayKey(now);
  const countDay = (key) => leads.filter((lead) => lead[key] && dayKey(new Date(lead[key])) === today).length;
  return {
    newLeads: countDay('createdAt'),
    qualifying: leads.filter((lead) => lead.state === 'qualificando').length,
    offers: countDay('offerAt'),
    won: countDay('conversionAt'),
    lost: countDay('lostAt'),
    pendingTasks: tasks.filter((task) => !task.done && dayKey(new Date(task.dueAt)) === today).length,
  };
}
