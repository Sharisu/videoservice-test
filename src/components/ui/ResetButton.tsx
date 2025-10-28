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
        'h-10 rounded-md px-4 py-2 text-sm font-medium text-gray-700',
        disabled ? 'opacity-50' : 'cursor-pointer bg-gray-200 opacity-100 hover:bg-gray-300',
        className,
      )}
    >
      {disabled ? <TrashIcon className="h-4 w-4" /> : <Trash2Icon className="h-4 w-4" />}
    </button>
  );
}
