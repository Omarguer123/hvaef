import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CvEditor from '@/components/CvEditor/CvEditor';
import CvPreview from '@/components/CvEditor/CvPreview';
import { CvData } from '@/lib/templateEngine';
import { useAuth } from '@/lib/auth';

export default function EditorPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user, loading } = useAuth();

  const [cvData, setCvData] = useState<CvData>({
    personal: { fullName: '', email: '', phone: '' },
    summary: '',
    experience: [],
    education: [],
    skills: [],
  });
  const [templateId, setTemplateId] = useState('harvard_mba');
  const [title, setTitle] = useState('Untitled CV');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (loading || !user) return;
    if (id && id !== 'new') {
      fetch(`/api/cvs/${id}`)
        .then((r) => r.json())
        .then((cv) => {
          setCvData(cv.data);
          setTemplateId(cv.template_id);
          setTitle(cv.title);
        })
        .catch(console.error);
    }
  }, [id, user, loading]);

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/cvs/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id === 'new' ? undefined : id,
        title,
        template_id: templateId,
        data: cvData,
      }),
    });
    setSaving(false);
  };

  const handleExportPdf = () => {
    window.print();
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="flex h-screen">
      {/* Editor sidebar – hidden during print */}
      <div className="w-1/2 p-4 overflow-auto no-print">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xl font-bold mb-4 block"
        />
        <CvEditor
          cvData={cvData}
          onChange={setCvData}
          templateId={templateId}
          onTemplateChange={setTemplateId}
        />
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={handleExportPdf}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* CV Preview – shown on screen and printed */}
      <div className="w-1/2 bg-gray-100 p-4">
        <CvPreview cvData={cvData} templateId={templateId} />
      </div>
    </div>
  );
}