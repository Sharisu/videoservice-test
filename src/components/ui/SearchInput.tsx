'use client';

import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  id = 'search',
  className = '',
}: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`relative ${className}`}>
      <Search className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
      <input
        id={id}
        type="text"
        value={value}
        autoComplete="off"
        onChange={handleChange}
        placeholder={placeholder}
        className="focus:border-accent border-muted hover:bg-muted h-10 w-full rounded-full border-2 py-2 pr-4 pl-11 focus:outline-none"
      />
    </div>
  );
}
