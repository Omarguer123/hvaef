export const harvard = {
  id: 'harvard_mba',
  name: 'Harvard / MBA',
  pagesMax: 1,
  accentColor: '#1E3A5F',
  photo: false,
  columns: 1 as const,
  sections: [
    { id: 'header', type: 'header', heightMm: 35, components: ['name', 'contact_row'] },
    { id: 'summary', type: 'text_block', maxLines: 4, label: 'Professional Summary' },
    {
      id: 'experience',
      type: 'repeatable_list',
      label: 'Professional Experience',
      maxItems: 4,
      itemSchema: ['jobTitle', 'company', 'dates', 'bullets'],
      maxBulletsPerItem: 4,
    },
    {
      id: 'education',
      type: 'repeatable_list',
      label: 'Education',
      maxItems: 4,
      itemSchema: ['degree', 'university', 'year', 'details'],
    },
    {
      id: 'skills',
      type: 'tag_grid',
      label: 'Skills & Interests',
      maxTags: 12,
      columns: 3,
    },
  ],
};