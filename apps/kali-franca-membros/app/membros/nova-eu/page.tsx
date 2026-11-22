import { redirect } from 'next/navigation';
import { MemberShell } from '../../components/MemberShell';
import { createSupabaseServerClient } from '../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

const titles = {
  abundancia: 'Abundância e Fluxo Financeiro',
  'amor-proprio': 'Amor Próprio e Conexões Elevadas',
  oportunidades: 'Oportunidades e Realização',
  leveza: 'Leveza, Saúde e Confiança Total',
};

const files = [
  ['diario.pdf', 'Abrir o diário em PDF'],
  ['nova-eu.mp3', 'Ouvir Nova Eu'],
  ['basta-permitir-22min.mp3', 'Ouvir Basta Permitir · 22 min'],
  ['basta-permitir-71min.mp3', 'Ouvir Basta Permitir · 1h11'],
];

export default async function NovaEuLibrary() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login/');

  const { data, error } = await supabase.from('nova_eu_orders').select('product_slug');
  const slugs = [...new Set(data?.map(order => order.product_slug) ?? [])];
  const tracks = await Promise.all(slugs.map(async slug => {
    const title = titles[slug as keyof typeof titles];
    if (!title) return null;
    const assets = await Promise.all(files.map(async ([file, label]) => {
      const { data } = await supabase.storage.from('nova-eu').createSignedUrl(slug + '/' + file, 3600);
      return data?.signedUrl ? { label, url: data.signedUrl } : null;
    }));
    return { slug, title, assets };
  }));

  return (
    <MemberShell memberEmail={user.email} activePath="nova-eu">
      <div className="member-content__intro">
        <p className="eyebrow">Sua jornada de 30 dias</p>
        <h1>Diário Nova Eu</h1>
        {error && <p>Os materiais estão temporariamente indisponíveis.</p>}
        {!error && tracks.length === 0 && <p>Quando o pagamento for aprovado, a trilha aparecerá aqui. Entre com o mesmo e-mail usado na compra.</p>}
        {tracks.length > 0 && <p>Comece pela preparação. Depois, volte ao diário pela manhã e à noite e faça um balanço ao fim de cada semana.</p>}
      </div>
      {tracks.length > 1 && (
        <nav className="nova-eu-tracks" aria-label="Suas trilhas">
          {tracks.map(track => track && <a key={track.slug} href={`#nova-eu-${track.slug}`}>{track.title}</a>)}
        </nav>
      )}
      {tracks.map(track => {
        if (!track) return null;
        const [diary, morningAudio, shortAudio, longAudio] = track.assets;
        return (
          <section className="nova-eu-journey" key={track.slug} id={`nova-eu-${track.slug}`} aria-labelledby={`title-${track.slug}`}>
            <h2 id={`title-${track.slug}`}>{track.title}</h2>
            <ol className="nova-eu-steps">
              <li>
                <details open>
                  <summary>Prepare-se para o Dia 1</summary>
                  <p>Abra o diário e leia “Como usar este diário”. Preencha o Retrato da Nova Eu, o Mapa de Manifestação e o Mural. Escolha um horário de manhã e outro à noite para a sua prática.</p>
                  {diary && <a className="nova-eu-action" href={diary.url} target="_blank" rel="noreferrer">{diary.label}</a>}
                </details>
              </li>
              <li>
                <details>
                  <summary>Pratique pela manhã e à noite</summary>
                  <p><strong>De manhã</strong>, ouça o áudio Nova Eu e retome as afirmações do seu Mural.</p>
                  {morningAudio && (
                    <div className="nova-eu-audio">
                      <span>Reprogramação Nova Eu</span>
                      <audio controls preload="none" src={morningAudio.url} aria-label={morningAudio.label} />
                      <a href={morningAudio.url} target="_blank" rel="noreferrer">Abrir áudio em outra aba</a>
                    </div>
                  )}
                  <p><strong>À noite</strong>, abra o dia correspondente, leia o decreto três vezes em voz alta e responda às perguntas de escrita.</p>
                  {diary && <a className="nova-eu-action" href={diary.url} target="_blank" rel="noreferrer">{diary.label}</a>}
                </details>
              </li>
              <li>
                <details>
                  <summary>Faça o balanço de cada semana</summary>
                  <p>Use as páginas “Balanço da semana” do diário. Registre o que percebeu, o que quer manter e o que deseja ajustar antes de seguir.</p>
                </details>
              </li>
              <li>
                <details>
                  <summary>Celebre o fim do ciclo</summary>
                  <p>Depois do Dia 30, complete a página “Celebração da Nova Eu”. Releia a intenção inicial e escolha uma prática que queira continuar.</p>
                </details>
              </li>
            </ol>
            {(shortAudio || longAudio) && (
              <details className="nova-eu-extra">
                <summary>Áudios de apoio · Basta Permitir</summary>
                <p>Escolha a gravação que cabe no seu tempo. Você pode voltar a ela durante a jornada.</p>
                {[shortAudio, longAudio].map(asset => asset && (
                  <div key={asset.label} className="nova-eu-audio">
                    <span>{asset.label}</span>
                    <audio controls preload="none" src={asset.url} aria-label={asset.label} />
                    <a href={asset.url} target="_blank" rel="noreferrer">Abrir áudio em outra aba</a>
                  </div>
                ))}
              </details>
            )}
            {track.assets.some(asset => !asset) && <p>Alguns arquivos desta trilha estão temporariamente indisponíveis.</p>}
          </section>
        );
      })}
    </MemberShell>
  );
}
