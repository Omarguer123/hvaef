import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [cvs, setCvs] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    if (user) {
      fetch('/api/cvs/list')
        .then((r) => r.json())
        .then(setCvs)
        .catch(console.error);
    }
  }, [user, loading]);

  const createNew = async () => {
    const res = await fetch('/api/cvs/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'New CV',
        template_id: 'harvard_mba',
        data: {
          personal: { fullName: '', email: '', phone: '' },
          summary: '',
          experience: [],
          education: [],
          skills: [],
        },
      }),
    });
    const cv = await res.json();
    router.push(`/editor/${cv.id}`);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">My CVs</h1>
          <div className="flex gap-4">
            <button
              onClick={createNew}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              + New CV
            </button>
            <button onClick={signOut} className="text-gray-600">
              Sign Out
            </button>
          </div>
        </div>
        {cvs.length === 0 ? (
          <p>No CVs yet. Create one!</p>
        ) : (
          <div className="grid gap-4">
            {cvs.map((cv) => (
              <Link key={cv.id} href={`/editor/${cv.id}`}>
                <div className="bg-white p-4 rounded shadow hover:shadow-md cursor-pointer flex justify-between">
                  <div>
                    <h3 className="font-semibold">{cv.title}</h3>
                    <p className="text-sm text-gray-500">{cv.template_id}</p>
                  </div>
                  <p className="text-sm text-gray-400">
                    {new Date(cv.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}