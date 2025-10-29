import { ErrorMode, Video, VideoDuration } from '@/src/types';

const API_BASE_URL = 'http://localhost:3000';

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
}

async function apiRequest<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
  const { method = 'GET', headers = {} } = options;
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  const response = await fetch(url, {
    method,
    headers: defaultHeaders,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.error || `HTTP Error: ${response.status}`;

    if (response.status === 404) {
      throw new Error('Resource not found');
    }

    throw new Error(errorMessage);
  }

  return response.json();
}

interface GetVideosArgs {
  search?: string;
  duration?: VideoDuration;
  errorMode?: ErrorMode;
}

export async function getVideos({ search, duration, errorMode }: GetVideosArgs): Promise<Array<Video>> {
  const params = new URLSearchParams();

  if (search) {
    params.set('search', search);
  }
  if (duration && duration !== 'all') {
    params.set('duration', duration);
  }
  if (errorMode) {
    params.set('errorMode', errorMode);
  }

  const endpoint = `/api/videos${params.toString() ? `?${params.toString()}` : ''}`;

  return apiRequest<Array<Video>>(endpoint);
}

export async function getVideoById(id: string): Promise<Video> {
  const endpoint = `/api/videos/${id}`;

  return apiRequest<Video>(endpoint);
}
