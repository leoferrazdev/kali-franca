import { redirect } from 'next/navigation';
import { ElevaSetupForm } from '../../../components/ElevaSetupForm';
import { MemberShell } from '../../../components/MemberShell';
import { createSupabaseServerClient } from '../../../../lib/supabase/server';
import { isSupabaseConfigured } from '../../../../lib/supabase/config';

export const dynamic = 'force-dynamic';

export default async function ElevaOnboardingPage() {
  let memberEmail: string | undefined;
  let initialCutText = '';
  const preview = !isSupabaseConfigured();

  if (!preview) {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login/');

    memberEmail = user.email;
    const { data: product } = await supabase.from('eleva_products').select('id').eq('slug', 'eleva-5d').maybeSingle();
    if (product) {
      const { data: setup } = await supabase
        .from('eleva_member_setups')
        .select('initial_cut_text')
        .eq('user_id', user.id)
        .eq('product_id', product.id)
        .maybeSingle();
      initialCutText = setup?.initial_cut_text || '';
    }
  }

  return (
    <MemberShell memberEmail={memberEmail} preview={preview} activePath="eleva">
      <div className="eleva-onboarding__intro">
        <p className="eyebrow">Configuração inicial / 01</p>
        <h1>O seu primeiro marco é uma escolha.</h1>
        <p>Antes de olhar para o que ficou para trás, registre com clareza o que você escolhe não carregar para o próximo movimento.</p>
      </div>
      <section className="eleva-onboarding" aria-labelledby="eleva-onboarding-title">
        <div className="eleva-onboarding__heading">
          <p className="eyebrow">O Corte Energético</p>
          <h2 id="eleva-onboarding-title">Abra espaço para a identidade que você escolhe habitar.</h2>
          <p>Este registro ficará associado somente à sua conta e poderá ser revisitado no seu percurso.</p>
        </div>
        <ElevaSetupForm initialCutText={initialCutText} preview={preview} />
      </section>
    </MemberShell>
  );
}
