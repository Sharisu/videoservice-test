import { ApiErrorToggle, ThemeToggle } from '@/src/components/ui';

import { AppLogo } from './AppLogo';

export function Header() {
  return (
    <header className="bg-background border-border z-10 flex h-[64px] w-full shrink-0 items-center justify-center border-b px-4 shadow-md">
      <div className="flex w-full max-w-4xl items-center justify-between gap-10">
        <AppLogo />
        <div className="flex items-center justify-center gap-2">
          <ApiErrorToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
