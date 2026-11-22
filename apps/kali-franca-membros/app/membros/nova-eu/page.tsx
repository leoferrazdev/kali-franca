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
  ['diario.pdf', 'Baixar o Diário Nova Eu'],
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
        <p className="eyebrow">Seus materiais</p>
        <h1>Diário Nova Eu</h1>
        {error && <p>Os materiais estão temporariamente indisponíveis.</p>}
        {!error && tracks.length === 0 && <p>Quando o pagamento for aprovado, a trilha aparecerá aqui. Entre com o mesmo e-mail usado na compra.</p>}
      </div>
      {tracks.map(track => track && (
        <section key={track.slug}>
          <h2>{track.title}</h2>
          <ul>
            {track.assets.map(asset => asset && <li key={asset.label}><a href={asset.url}>{asset.label}</a></li>)}
          </ul>
          {track.assets.some(asset => !asset) && <p>Alguns arquivos desta trilha estão temporariamente indisponíveis.</p>}
        </section>
      ))}
    </MemberShell>
  );
}
