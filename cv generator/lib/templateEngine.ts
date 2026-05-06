import templates from '@/components/templates/registry';

export interface CvData {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    address?: string;
    linkedin?: string;
    title?: string;
    photo?: string;
  };
  summary: string;
  experience: { jobTitle: string; company: string; dates: string; bullets: string[] }[];
  education: { degree: string; university: string; year: string; details?: string }[];
  skills: string[];
  languages?: string[];
  certifications?: string[];
  memberships?: string;
  personalInfo?: Record<string, string>;
}

export function getTemplate(id: string) {
  return (templates as any)[id];
}

export function getTemplateIds() {
  return Object.keys(templates);
}