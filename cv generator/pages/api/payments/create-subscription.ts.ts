import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { createSubscription } from '@/lib/paypal';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const supabase = createServerSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  const { plan } = req.body;
  const planId =
    plan === 'pro'
      ? process.env.PAYPAL_PLAN_PRO_ID
      : process.env.PAYPAL_PLAN_BUSINESS_ID;
  if (!planId) return res.status(400).json({ error: 'Invalid plan' });

  try {
    const { subscriptionID, approvalURL } = await createSubscription(
      planId,
      session.user.email!
    );
    await supabase.from('subscriptions').insert({
      user_id: session.user.id,
      paypal_subscription_id: subscriptionID,
      plan,
      status: 'pending',
    });
    return res.status(200).json({ approvalURL });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}