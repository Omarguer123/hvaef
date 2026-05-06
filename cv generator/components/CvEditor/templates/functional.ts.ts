export const functional = {
  id: 'functional',
  name: 'Functional / Skills-Based',
  pagesMax: 2,
  accentColor: '#2E7D32',
  photo: false,
  columns: 1 as const,
  sections: [
    { id: 'header', type: 'header', heightMm: 30, components: ['name', 'contact_row'] },
    { id: 'skills_summary', type: 'tag_grid', label: 'Core Competencies', maxTags: 12, columns: 2 },
    { id: 'achievements', type: 'repeatable_list', label: 'Key Achievements', maxItems: 6, itemSchema: ['achievement_bullet'], maxBulletsPerItem: 1 },
    { id: 'work_history_compact', type: 'compact_list', label: 'Career Timeline', maxItems: 6, itemSchema: ['jobTitle', 'company', 'dates'] },
    { id: 'education', type: 'repeatable_list', label: 'Education', maxItems: 4, itemSchema: ['degree', 'university', 'year'] },
  ],
};