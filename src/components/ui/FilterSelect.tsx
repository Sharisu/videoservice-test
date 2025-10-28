'use client';

import { FilterIcon } from 'lucide-react';

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
    <div className="flex h-10 flex-row items-center gap-2 rounded-md px-4 py-2">
      <FilterIcon className="h-4 w-4" />
      <select
        id={id}
        value={value}
        onChange={handleChange}
        className={`h-10 w-full appearance-none ${className}`}
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
    </div>
  );
}
