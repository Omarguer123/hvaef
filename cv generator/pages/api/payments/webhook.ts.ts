import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { verifyWebhookSignature } from '@/lib/paypal';
import { buffer } from 'micro';

export const config = { api: { bodyParser: false } };

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const rawBody = (await buffer(req)).toString('utf8');
  const isValid = await verifyWebhookSignature(req.headers, rawBody);
  if (!isValid) return res.status(403).json({ error: 'Invalid signature' });

  const event = JSON.parse(rawBody);
  const subscriptionId = event.resource?.id;
  if (!subscriptionId) return res.status(400).end();

  if (event.event_type === 'BILLING.SUBSCRIPTION.ACTIVATED') {
    await supabaseAdmin
      .from('subscriptions')
      .update({ status: 'active', paypal_data: event.resource })
      .eq('paypal_subscription_id', subscriptionId);

    const { data: sub } = await supabaseAdmin
      .from('subscriptions')
      .select('user_id, plan')
      .eq('paypal_subscription_id', subscriptionId)
      .single();
    if (sub) {
      await supabaseAdmin
        .from('profiles')
        .update({ plan: sub.plan, subscription_status: 'active' })
        .eq('id', sub.user_id);
    }
  }

  return res.status(200).json({ received: true });
}