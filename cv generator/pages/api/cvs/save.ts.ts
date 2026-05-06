import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'POST') {
    const { id, title, template_id, data } = req.body;
    const userId = session.user.id;
    let cv;

    if (id) {
      const { data: updated, error } = await supabase
        .from('cvs')
        .update({ title, template_id, data, updated_at: new Date().toISOString() })
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single();
      if (error) return res.status(500).json({ error: error.message });
      cv = updated;
    } else {
      const { data: inserted, error } = await supabase
        .from('cvs')
        .insert({ user_id: userId, title, template_id, data })
        .select()
        .single();
      if (error) return res.status(500).json({ error: error.message });
      cv = inserted;
    }

    await supabase.from('cv_versions').insert({ cv_id: cv.id, data, template_id });
    return res.status(200).json(cv);
  }

  return res.status(405).end();
}