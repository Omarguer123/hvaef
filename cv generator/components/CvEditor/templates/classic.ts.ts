export const classic = {
  id: 'classic_conservative',
  name: 'Classic Conservative',
  pagesMax: 2,
  accentColor: '#4A4A4A',
  photo: false,
  ruleLines: true,
  columns: 1 as const,
  sections: [
    { id: 'header', type: 'header', heightMm: 30, components: ['name', 'contact_row'] },
    { id: 'summary', type: 'text_block', maxLines: 5, label: 'Profile' },
    {
      id: 'experience',
      type: 'repeatable_list',
      label: 'Professional Experience',
      maxItems: 5,
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
    { id: 'memberships', type: 'text_block', maxLines: 3, label: 'Professional Memberships' },
  ],
};