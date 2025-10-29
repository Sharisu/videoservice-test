import { getVideoById, getVideos } from '../api-client';

global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('api-client', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('getVideos', () => {
    it('returns videos on success', async () => {
      const mockVideos = [{ id: '1', title: 'Test', author: 'A', durationSec: 120 }];
      mockFetch.mockResolvedValueOnce({ ok: true, json: async () => mockVideos } as Response);

      const result = await getVideos({});
      expect(result).toEqual(mockVideos);
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/api/videos', expect.any(Object));
    });

    it('builds URL with provided params', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true, json: async () => [] } as Response);
      await getVideos({ search: 'cat', duration: 'short', errorMode: 'always' });
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/videos?search=cat&duration=short&errorMode=always',
        expect.any(Object),
      );
    });

    it('throws "Resource not found" on 404', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ error: 'Not found' }),
      } as Response);

      await expect(getVideos({})).rejects.toThrow('Resource not found');
    });

    it('throws API error message on server error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Internal error' }),
      } as Response);

      await expect(getVideos({})).rejects.toThrow('Internal error');
    });
  });

  describe('getVideoById', () => {
    it('returns single video on success', async () => {
      const mockVideo = { id: '1', title: 'Video', author: 'A', durationSec: 100 };
      mockFetch.mockResolvedValueOnce({ ok: true, json: async () => mockVideo } as Response);

      const result = await getVideoById('1');
      expect(result).toEqual(mockVideo);
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/api/videos/1', expect.any(Object));
    });

    it('throws "Resource not found" for missing video', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ error: 'Not found' }),
      } as Response);

      await expect(getVideoById('999')).rejects.toThrow('Resource not found');
    });
  });
});
