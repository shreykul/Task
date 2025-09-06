import { ImageType } from "./types";

export function normalizeImage(raw: any): ImageType {
    return {
      id: raw.id,
      name: raw.name,
      width: raw.width,
      height: raw.height,
      thumbnailUrl: raw.thumbnail_url??raw.path_dict?.thumbnail_url,
      mediumUrl: raw.path_dict?.med_url ?? raw.med_url,
      highUrl: raw.path_dict?.high_url ?? raw.high_url ,
    };
  }
  