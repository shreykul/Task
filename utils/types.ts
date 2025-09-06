export type ImageType = {
  id: string;
  name: string;
  width: number;
  height: number;
  thumbnailUrl: string;
  mediumUrl: string;
  highUrl: string;
};
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

export type HeaderProps = {title:string,back?:boolean,navigation: any;settings?:boolean}