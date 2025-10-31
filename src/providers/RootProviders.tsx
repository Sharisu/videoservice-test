import { FiltersProvider } from '@/src/hooks/useFilters';

import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <FiltersProvider>{children}</FiltersProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
