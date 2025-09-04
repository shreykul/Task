export interface ImageType {
    id: string;
    name: string;
    description: string;
    thumbnail_url: string;
    image_url: string;
    category: string;
    created_at: string;
    updated_at: string;
}
export interface ImageResponse {
    images: Array<{
        id: string;
        name: string;
        description: string;
        thumbnail_url: string;
        image_url: string;
        category: string;
        created_at: string;
        updated_at: string;
      [key: string]: any;
    }>;
    [key: string]: any;
  }