export interface Video {
  id: string;
  title: string;
  author: string;
  duration: number;
  thumbnail: string;
  publishedAt: string;
  views?: number;
  description?: string;
}
