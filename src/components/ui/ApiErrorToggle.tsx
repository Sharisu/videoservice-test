'use client';

import { useEffect, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/DropdownMenu';
import { getErrorMode, setErrorMode } from '@/src/lib/cookies';
import { ErrorMode } from '@/src/types';

const errorModes: Array<{ value: ErrorMode; label: string; color: string }> = [
  { value: 'off', label: 'Error Off', color: 'bg-[#04c825]' },
  { value: 'sometimes', label: 'Sometimes Error', color: 'bg-[#ffc107]' },
  { value: 'always', label: 'Always Error', color: 'bg-[#f44336]' },
];

export const ApiErrorToggle = () => {
  const [errorMode, setErrorModeState] = useState<ErrorMode>('off');

  useEffect(() => {
    setErrorModeState(getErrorMode());
  }, []);

  const handleSetErrorMode = (mode: ErrorMode) => {
    setErrorMode(mode);
    setErrorModeState(mode);
  };

  const currentModeData = errorModes.find(mode => mode.value === errorMode);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="group theme-toggle-trigger border-border bg-background hover:bg-muted data-[state=open]:bg-muted focus:ring-accent my-0 h-8 w-8 rounded-md border transition-colors focus:ring-2 focus:outline-none"
            title={currentModeData?.label}
            aria-label={`Toggle API error mode: ${currentModeData?.label}`}
          >
            <div className={`mx-auto h-3 w-3 rounded-full transition-all duration-200 ${currentModeData?.color} `} />
            <span className="sr-only">Toggle API error mode</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {errorModes.map(mode => (
            <DropdownMenuItem
              key={mode.value}
              onClick={() => handleSetErrorMode(mode.value)}
              className="flex items-center gap-2"
            >
              <div className={`h-3 w-3 rounded-full ${mode.color}`} />
              {mode.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
