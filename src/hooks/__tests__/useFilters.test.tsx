import { act, renderHook, waitFor } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { FiltersProvider, useFilters } from '../useFilters';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe('useFilters', () => {
  const mockPush = jest.fn();
  const mockReplace = jest.fn();
  const mockSearchParams = {
    get: jest.fn(),
    toString: jest.fn(() => ''),
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      replace: mockReplace,
    });
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('debounces search and updates URL after delay; updates duration immediately', async () => {
    mockSearchParams.get.mockReturnValue(null);
    mockSearchParams.toString.mockReturnValue('');

    const wrapper = ({ children }: { children: React.ReactNode }) => <FiltersProvider>{children}</FiltersProvider>;

    const { result } = renderHook(() => useFilters(), { wrapper });

    mockReplace.mockClear();

    act(() => result.current.onSearchChange('h'));
    act(() => result.current.onSearchChange('he'));
    act(() => result.current.onSearchChange('hello'));
    act(() => jest.advanceTimersByTime(200));

    expect(mockReplace).not.toHaveBeenCalled();

    act(() => jest.advanceTimersByTime(320));

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/?search=hello', { scroll: false });
    });

    act(() => result.current.onDurationChange('short'));
    expect(mockReplace).toHaveBeenCalledWith('/?search=hello&duration=short', { scroll: false });
  });
});
