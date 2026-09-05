export type ElevaMovementSlug = 'reprogramar' | 'alinhar' | 'manifestar' | 'sustentar' | 'elevar';

export type ElevaMovement = {
  position: 1 | 2 | 3 | 4 | 5;
  slug: ElevaMovementSlug;
  title: string;
  focus: string;
  modules: readonly string[];
};

export const ELEVA_PRODUCT = {
  slug: 'eleva-5d',
  name: 'Eleva 5D',
  description: 'Um ciclo de cinco movimentos para retornar ao centro e sustentar o próximo movimento.',
} as const;

export const ELEVA_MOVEMENTS: readonly ElevaMovement[] = [
  {
    position: 1,
    slug: 'reprogramar',
    title: 'Reprogramar',
    focus: 'Despertar diário e clareza.',
    modules: ['Player de áudio', 'Caderno da Criadora'],
  },
  {
    position: 2,
    slug: 'alinhar',
    title: 'Alinhar',
    focus: 'Retorno ao estado de potência.',
    modules: ['Bússola da Verdade Divina', 'Âncoras Divinas'],
  },
  {
    position: 3,
    slug: 'manifestar',
    title: 'Manifestar',
    focus: 'Visão, sentimento e ação prática.',
    modules: ['Mapa da Realização', 'Habitar'],
  },
  {
    position: 4,
    slug: 'sustentar',
    title: 'Sustentar',
    focus: 'Musculatura emocional e constância.',
    modules: ['Áudios e vídeos'],
  },
  {
    position: 5,
    slug: 'elevar',
    title: 'Elevar',
    focus: 'Expansão da visão e da consciência.',
    modules: ['Sabedoria profunda', 'Playlist'],
  },
];

export function findElevaMovement(slug: string) {
  return ELEVA_MOVEMENTS.find((movement) => movement.slug === slug);
}
