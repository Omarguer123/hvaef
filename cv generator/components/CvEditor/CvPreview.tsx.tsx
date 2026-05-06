import { useMemo } from 'react';
import { getTemplate, CvData } from '@/lib/templateEngine';

interface Props {
  cvData: CvData;
  templateId: string;
}

export default function CvPreview({ cvData, templateId }: Props) {
  const template = useMemo(() => getTemplate(templateId), [templateId]);

  if (!template) return <p>Template not found</p>;

  return (
    <div className="cv-page">
      <h1 className="cv-name">{cvData.personal.fullName || 'Your Name'}</h1>
      <div className="cv-contact">
        {cvData.personal.email} · {cvData.personal.phone}
      </div>

      {cvData.summary && (
        <>
          <h2 className="section-title">Summary</h2>
          <p>{cvData.summary}</p>
        </>
      )}

      {cvData.experience.length > 0 && (
        <div>
          <h2 className="section-title">Experience</h2>
          {cvData.experience.map((exp, i) => (
            <div key={i} className="repeatable-list-item">
              <div className="item-header">
                <span className="job-title">{exp.jobTitle}</span>
                <span className="dates">{exp.dates}</span>
              </div>
              <div className="company">{exp.company}</div>
            </div>
          ))}
        </div>
      )}

      {cvData.education.length > 0 && (
        <div>
          <h2 className="section-title">Education</h2>
          {cvData.education.map((edu, i) => (
            <div key={i} className="repeatable-list-item">
              <div className="item-header">
                <span className="degree-title">{edu.degree}</span>
                <span className="dates">{edu.year}</span>
              </div>
              <div className="university">{edu.university}</div>
            </div>
          ))}
        </div>
      )}

      {cvData.skills.length > 0 && (
        <div>
          <h2 className="section-title">Skills</h2>
          <div className="tag-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {cvData.skills.map((s, i) => (
              <span key={i} className="tag">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}