export interface ImageType {
    id: string;
    name: string;
    description: string;
    thumbnail_url: string;
    med_url: string;
    high_url: string;
    image_url: string;
    category: string;
    created_at: string;
    updated_at: string;
}
export interface ImageResponse {
  images: ImageType[];
  [key: string]: any;
}

export type NavProps ={
  type: 'push' | 'setRoot' | 'pop' | 'popToTop' | 'navigate';
  navigation: any;
  page?: string;
  passProps?: object;
}

export type HeaderProps = {title:string,back?:boolean,navigation: any;}