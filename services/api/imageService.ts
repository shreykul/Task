import { normalizeImage } from "@/utils/Normalizers";
import { ImageResponse, ImageType } from "@/utils/types";
import httpClient from "../network/httpServices";

export async function fetchImages(
  page: number,
  pageSize: number,
  orderBy: number = 2,
  orderAsc: boolean = true,
  cancelToken?: AbortSignal
): Promise<ImageType[]> {
  if (!process.env.EXPO_PUBLIC_API_URL || !process.env.EXPO_PUBLIC_API_KEY || !process.env.EXPO_PUBLIC_EVENT_ID) {
    throw new Error("Missing API configuration (check app.config.js and .env)");
  }

  const url = `${process.env.EXPO_PUBLIC_API_URL}?event_id=${process.env.EXPO_PUBLIC_EVENT_ID}&page=${page}&page_size=${pageSize}&key=${process.env.EXPO_PUBLIC_API_KEY}&order_by=${orderBy}&order_asc=${orderAsc}`;
  const response = await httpClient.get<ImageResponse>(url, {
    signal: cancelToken,
  });
  const rawImages = response.data?.data?.image_list ?? [];
  return rawImages.map(normalizeImage);
}
