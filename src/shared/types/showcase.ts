export interface Showcase {
  id: string;
  title: string;
  description: string;
  details: string;
  author: string;
  batch: string;
  thumbnail: string;
  images: string[] | string;
  category: string;
  videoUrl?: string;
  teamMembers?: string[];
  isGroupProject?: boolean;
}
