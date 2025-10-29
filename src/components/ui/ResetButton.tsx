'use client';

import clsx from 'clsx';
import { Trash2Icon, TrashIcon } from 'lucide-react';

interface ResetButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export function ResetButton({ onClick, disabled = false, className = '' }: ResetButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'flex h-10 w-10 items-center justify-center rounded-md',
        disabled
          ? 'text-muted-foreground opacity-50'
          : 'hover:text-accent bg-muted text-foreground cursor-pointer opacity-100',
        className,
      )}
    >
      {disabled ? <TrashIcon className="h-4 w-4" /> : <Trash2Icon className="h-4 w-4" />}
    </button>
  );
}
