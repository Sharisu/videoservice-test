import { act, renderHook, waitFor } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useFilters } from '../useFilters';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('useFilters', () => {
  const mockPush = jest.fn();
  const mockSearchParams = {
    get: jest.fn(),
    toString: jest.fn(() => ''),
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('debounces search and updates URL after delay; updates duration immediately', async () => {
    mockSearchParams.get.mockReturnValue(null);
    mockSearchParams.toString.mockReturnValue('');

    const { result } = renderHook(() => useFilters());

    act(() => result.current.onSearchChange('h'));
    act(() => result.current.onSearchChange('he'));
    act(() => result.current.onSearchChange('hello'));
    expect(mockPush).not.toHaveBeenCalled();

    act(() => jest.advanceTimersByTime(500));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('?search=hello', { scroll: false });
    });

    act(() => result.current.onDurationChange('short'));
    expect(mockPush).toHaveBeenCalledWith('?search=hello&duration=short', { scroll: false });
  });
});
