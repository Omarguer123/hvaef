export const chronological = {
  id: 'chronological',
  name: 'Chronological (Plain)',
  pagesMax: 2,
  accentColor: '#000000',
  photo: false,
  columns: 1 as const,
  sections: [
    { id: 'header', type: 'header', heightMm: 30, components: ['name', 'contact_row'] },
    { id: 'summary', type: 'text_block', maxLines: 4, label: 'Summary' },
    {
      id: 'experience',
      type: 'repeatable_list',
      label: 'Work History',
      maxItems: 6,
      itemSchema: ['jobTitle', 'company', 'dates', 'bullets'],
      maxBulletsPerItem: 4,
    },
    { id: 'education', type: 'repeatable_list', label: 'Education', maxItems: 4, itemSchema: ['degree', 'university', 'year'] },
    { id: 'skills', type: 'tag_list', label: 'Additional Skills' },
  ],
};