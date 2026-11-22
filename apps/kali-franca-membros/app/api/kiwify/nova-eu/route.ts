import { createHmac, timingSafeEqual } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import { requireSupabasePublicConfig } from '../../../../lib/supabase/config';

const products = new Map([
  ['a3e37040-e5bc-11f1-9def-a1c78489fd32', 'abundancia'],
  ['b1c3af40-e5bc-11f1-a800-a91db7ea54e7', 'amor-proprio'],
  ['b7dca8a0-e5bc-11f1-a800-a91db7ea54e7', 'oportunidades'],
  ['be2bcd30-e5bc-11f1-9972-d949ca894c7b', 'leveza'],
]);

export async function POST(request: Request) {
  const secret = process.env.KIWIFY_NOVA_EU_WEBHOOK_TOKEN;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret || !serviceKey) return new Response(null, { status: 503 });

  const signature = new URL(request.url).searchParams.get('signature') ?? '';
  if (!/^[a-f\d]{40}$/i.test(signature)) return new Response(null, { status: 401 });

  const bytes = Buffer.from(await request.arrayBuffer());
  if (bytes.length > 256_000) return new Response(null, { status: 413 });
  const expected = createHmac('sha1', secret).update(bytes).digest();
  if (!timingSafeEqual(expected, Buffer.from(signature, 'hex'))) {
    return new Response(null, { status: 401 });
  }

  let order;
  try {
    order = JSON.parse(bytes.toString('utf8'));
  } catch {
    return new Response(null, { status: 400 });
  }

  const revoked = ['refunded', 'chargedback', 'chargeback'].includes(order?.order_status);
  if (!revoked && order?.order_status !== 'paid') return new Response(null, { status: 204 });
  const slug = products.get(order?.Product?.product_id);
  if (!slug) return new Response(null, { status: 204 });

  const email = order?.Customer?.email;
  const id = order?.order_id;
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      || typeof id !== 'string' || id.length < 1 || id.length > 128) {
    return new Response(null, { status: 400 });
  }

  const { url } = requireSupabasePublicConfig();
  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });
  const { error } = await supabase.rpc('record_nova_eu_order', {
    p_order_id: id, p_email: email, p_slug: slug, p_revoked: revoked,
  });
  return new Response(null, { status: error ? 503 : 204 });
}
