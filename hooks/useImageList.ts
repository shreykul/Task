import { ImageResponse } from "@/utils/types";
import { useEffect, useState } from "react";
import { fetchImages } from "../services/api/imageService";

export function useImageList(page: number, pageSize: number) {
  const [data, setData] = useState<ImageResponse["images"]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchImages(page, pageSize, 2, true, controller.signal);
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
  }, [page, pageSize]);

  return { data, loading, error };
}
