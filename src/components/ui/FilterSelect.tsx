'use client';

import { FilterIcon } from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './DropdownMenu';

interface SelectOption<T> {
  value: T;
  label: string;
}

interface SelectProps<T> {
  value: T;
  onChange: (value: T) => void;
  options: Array<SelectOption<T>>;
  placeholder?: string;
}

export function FilterSelect<T extends string>({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
}: SelectProps<T>) {
  const handleValueChange = (newValue: string) => {
    onChange(newValue as T);
  };

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="flex h-10 flex-1 flex-row items-center gap-2 py-2">
      <div className="flex flex-1">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="group filter-select-trigger hover:bg-muted border-muted h-10 w-full cursor-pointer rounded-xl border-2 bg-transparent px-0 px-4 shadow-none focus:ring-2"
            leftIcon={<FilterIcon className="h-4 w-4" />}
          >
            <span className="group-hover:text-accent text-muted-foreground truncate text-left">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            {options.map(option => (
              <DropdownMenuItem
                key={String(option.value)}
                onClick={() => handleValueChange(option.value)}
                className={'focus:text-accent-foreground'}
              >
                <span className="truncate">{option.label}</span>
                {option.value === value && <span className="ml-auto text-xs">✓</span>}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
