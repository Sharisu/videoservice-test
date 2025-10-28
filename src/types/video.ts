export interface Video {
  id: string;
  title: string;
  author: string;
  durationSec: number;
  thumbnail: string;
  publishedAt: string;
  views?: number;
  description?: string;
}
