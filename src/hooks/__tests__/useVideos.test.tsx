import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { mockVideos } from '@/src/constants';

import { useVideos } from '../useVideos';

jest.mock('@/src/lib/api-client', () => ({
  getVideos: jest.fn(),
}));

jest.mock('@/src/lib/cookies', () => ({
  getErrorMode: jest.fn(() => 'none'),
}));

import { getVideos } from '@/src/lib/api-client';
const mockGetVideos = getVideos as jest.MockedFunction<typeof getVideos>;

const createWrapper = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useVideos', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns videos on success', async () => {
    const mockData = [mockVideos[0]];
    mockGetVideos.mockResolvedValue(mockData);

    const { result } = renderHook(() => useVideos(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
    expect(mockGetVideos).toHaveBeenCalledWith({
      search: undefined,
      duration: undefined,
      errorMode: 'none',
    });
  });

  it('passes search and duration params', async () => {
    const mockData = [mockVideos[1]];
    mockGetVideos.mockResolvedValue(mockData);

    const { result } = renderHook(() => useVideos({ search: 'cat', duration: 'short' }), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockGetVideos).toHaveBeenCalledWith({
      search: 'cat',
      duration: 'short',
      errorMode: 'none',
    });
  });

  it('handles API error', async () => {
    mockGetVideos.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useVideos(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error?.message).toBe('API Error');
  });
});
