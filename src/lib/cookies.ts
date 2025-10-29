'use client';

import { ErrorMode } from '@/src/types/error';

const ERROR_MODE_COOKIE = 'api-error-mode';

export function setErrorMode(mode: ErrorMode) {
  document.cookie = `${ERROR_MODE_COOKIE}=${mode}; path=/; max-age=31536000`;
}

export function getErrorMode(): ErrorMode {
  if (typeof window === 'undefined') return 'off';

  const cookies = document.cookie.split(';');
  const errorModeCookie = cookies.find(cookie => cookie.trim().startsWith(`${ERROR_MODE_COOKIE}=`));

  if (errorModeCookie) {
    const value = errorModeCookie.split('=')[1] as ErrorMode;
    if (['off', 'sometimes', 'always'].includes(value)) {
      return value;
    }
  }

  return 'off';
}
