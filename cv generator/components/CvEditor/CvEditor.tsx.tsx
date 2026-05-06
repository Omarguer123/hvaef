import { CvData } from '@/lib/templateEngine';
import TemplateSelector from './TemplateSelector';
import { getTemplateIds } from '@/lib/templateEngine';

interface Props {
  cvData: CvData;
  onChange: (data: CvData) => void;
  templateId: string;
  onTemplateChange: (id: string) => void;
}

export default function CvEditor({ cvData, onChange, templateId, onTemplateChange }: Props) {
  return (
    <div>
      <TemplateSelector selected={templateId} onChange={onTemplateChange} templateIds={getTemplateIds()} />

      <label className="block mt-4">
        Full Name
        <input
          value={cvData.personal.fullName}
          onChange={(e) =>
            onChange({
              ...cvData,
              personal: { ...cvData.personal, fullName: e.target.value },
            })
          }
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      <label className="block mt-4">
        Email
        <input
          value={cvData.personal.email}
          onChange={(e) =>
            onChange({
              ...cvData,
              personal: { ...cvData.personal, email: e.target.value },
            })
          }
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      <label className="block mt-4">
        Phone
        <input
          value={cvData.personal.phone}
          onChange={(e) =>
            onChange({
              ...cvData,
              personal: { ...cvData.personal, phone: e.target.value },
            })
          }
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      <label className="block mt-4">
        Summary
        <textarea
          value={cvData.summary}
          onChange={(e) => onChange({ ...cvData, summary: e.target.value })}
          rows={4}
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      <div className="mt-4">
        <h3 className="font-semibold">Experience</h3>
        {cvData.experience.map((exp, i) => (
          <div key={i} className="border p-2 rounded mt-2">
            <input
              placeholder="Job Title"
              value={exp.jobTitle}
              onChange={(e) => {
                const n = [...cvData.experience];
                n[i].jobTitle = e.target.value;
                onChange({ ...cvData, experience: n });
              }}
              className="w-full border p-1 rounded mb-1"
            />
            <input
              placeholder="Company"
              value={exp.company}
              onChange={(e) => {
                const n = [...cvData.experience];
                n[i].company = e.target.value;
                onChange({ ...cvData, experience: n });
              }}
              className="w-full border p-1 rounded mb-1"
            />
            <input
              placeholder="Dates"
              value={exp.dates}
              onChange={(e) => {
                const n = [...cvData.experience];
                n[i].dates = e.target.value;
                onChange({ ...cvData, experience: n });
              }}
              className="w-full border p-1 rounded mb-1"
            />
          </div>
        ))}
        <button
          onClick={() =>
            onChange({
              ...cvData,
              experience: [
                ...cvData.experience,
                { jobTitle: '', company: '', dates: '', bullets: [] },
              ],
            })
          }
          className="text-blue-600 mt-2"
        >
          + Add Experience
        </button>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Education</h3>
        {cvData.education.map((edu, i) => (
          <div key={i} className="border p-2 rounded mt-2">
            <input
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => {
                const n = [...cvData.education];
                n[i].degree = e.target.value;
                onChange({ ...cvData, education: n });
              }}
              className="w-full border p-1 rounded mb-1"
            />
            <input
              placeholder="University"
              value={edu.university}
              onChange={(e) => {
                const n = [...cvData.education];
                n[i].university = e.target.value;
                onChange({ ...cvData, education: n });
              }}
              className="w-full border p-1 rounded mb-1"
            />
            <input
              placeholder="Year"
              value={edu.year}
              onChange={(e) => {
                const n = [...cvData.education];
                n[i].year = e.target.value;
                onChange({ ...cvData, education: n });
              }}
              className="w-full border p-1 rounded mb-1"
            />
          </div>
        ))}
        <button
          onClick={() =>
            onChange({
              ...cvData,
              education: [...cvData.education, { degree: '', university: '', year: '' }],
            })
          }
          className="text-blue-600 mt-2"
        >
          + Add Education
        </button>
      </div>

      <label className="block mt-4">
        Skills (comma separated)
        <input
          value={cvData.skills.join(',')}
          onChange={(e) => onChange({ ...cvData, skills: e.target.value.split(',') })}
          className="w-full border p-2 rounded mt-1"
        />
      </label>
    </div>
  );
}