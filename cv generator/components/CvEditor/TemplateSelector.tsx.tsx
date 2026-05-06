interface Props {
  selected: string;
  onChange: (id: string) => void;
  templateIds: string[];
}

export default function TemplateSelector({ selected, onChange, templateIds }: Props) {
  return (
    <select value={selected} onChange={(e) => onChange(e.target.value)} className="border p-2 rounded">
      {templateIds.map((id) => (
        <option key={id} value={id}>
          {id}
        </option>
      ))}
    </select>
  );
}