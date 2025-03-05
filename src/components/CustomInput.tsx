interface CustomInputProps {
  label: string;
  required?: boolean;
  type?: string;
  error?: string;
  name?: string;
}

export default function CustomInput({
  label,
  required = true,
  type = "text",
  name,
}: CustomInputProps) {
  return (
    <div className="grid">
      <label>{label}</label>
      <input
        className={`border border-gray-300 rounded w-full px-2 py-1`}
        required={required}
        type={type}
        name={name ?? label.toLowerCase()}
      />
    </div>
  );
}
