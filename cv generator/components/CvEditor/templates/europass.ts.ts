export const europass = {
  id: 'europass_official',
  name: 'Europass (Official EU)',
  pagesMax: 4,
  accentColor: '#0E47A1',
  photo: true,
  columns: 1 as const,
  usesTables: true,
  sections: [
    { id: 'personal_information', type: 'table_block', rows: ['first_name', 'last_name', 'email', 'phone', 'address', 'nationality', 'date_of_birth'] },
    { id: 'work_experience', type: 'repeatable_table', label: 'Work Experience', columns: ['dates', 'occupation', 'employer', 'main_activities'] },
    { id: 'education_training', type: 'repeatable_table', label: 'Education and Training', columns: ['dates', 'qualification', 'institution', 'eqf_level'] },
    {
      id: 'skills',
      type: 'skill_grid_table',
      label: 'Personal Skills',
      subsections: ['mother_tongue', 'other_languages', 'digital_skills', 'communication_skills', 'organisational_skills'],
    },
  ],
};