'use client';

interface SelectOption<T> {
  value: T;
  label: string;
}

interface SelectProps<T> {
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  id?: string;
  className?: string;
}

export function FilterSelect<T extends string>({
  value,
  onChange,
  options,
  id = 'select',
  className = '',
}: SelectProps<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as T);
  };

  return (
    <select
      id={id}
      value={value}
      onChange={handleChange}
      className={`h-10 w-full rounded-md border-2 border-gray-300 px-4 py-2 focus:outline-none ${className}`}
    >
      {options.map(option => (
        <option
          key={String(option.value)}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}
