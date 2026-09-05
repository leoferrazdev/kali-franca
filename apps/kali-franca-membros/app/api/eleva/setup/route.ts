import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '../../../../lib/supabase/server';

type SetupPayload = {
  initialCutText?: unknown;
};

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ message: 'Sessão necessária.' }, { status: 401 });
  }

  let payload: SetupPayload;
  try {
    payload = await request.json() as SetupPayload;
  } catch {
    return NextResponse.json({ message: 'Dados inválidos.' }, { status: 400 });
  }

  const initialCutText = typeof payload.initialCutText === 'string' ? payload.initialCutText.trim() : '';
  if (initialCutText.length < 2 || initialCutText.length > 4000) {
    return NextResponse.json({ message: 'O registro precisa ter entre 2 e 4000 caracteres.' }, { status: 400 });
  }

  const { data: product, error: productError } = await supabase
    .from('eleva_products')
    .select('id')
    .eq('slug', 'eleva-5d')
    .maybeSingle();

  if (productError || !product) {
    return NextResponse.json({ message: 'O produto ainda não está disponível neste ambiente.' }, { status: 503 });
  }

  const { data: setup, error } = await supabase
    .from('eleva_member_setups')
    .upsert({
      user_id: user.id,
      product_id: product.id,
      initial_cut_text: initialCutText,
      completed_at: new Date().toISOString(),
    }, { onConflict: 'user_id,product_id' })
    .select('id')
    .single();

  if (error || !setup) {
    return NextResponse.json({ message: 'Não foi possível salvar sua configuração agora.' }, { status: 500 });
  }

  return NextResponse.json({ id: setup.id }, { status: 200 });
}
