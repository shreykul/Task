import { ImageResponse } from "@/utils/types";
import { useEffect, useState } from "react";
import { fetchImages } from "../services/api/imageService";

export function useImageList(page: number, pageSize: number,order_by:number=2,order=true) {
  const [data, setData] = useState<ImageResponse["images"]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchImages(page, pageSize, order_by, order, controller.signal);
        setData(res.data.image_list ?? []);
      } catch (err: any) {
        if (err.name !== "CanceledError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [page, pageSize,order_by,order]);

  return { data, loading, error };
}
