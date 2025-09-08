import { renderHook, waitFor } from "@testing-library/react-native";
import { useImageList } from "../hooks/useImageList";
import { fetchImages } from "../services/api/imageService";
import { ImageResponse } from "../utils/types";

jest.mock("../services/api/imageService");
const mockFetchImages = fetchImages as jest.MockedFunction<typeof fetchImages>;

describe("useImageList", () => {
  const mockImages: ImageResponse["images"] = [
    {
      id: "1",
      name: "Image 1",
      thumbnailUrl: "https://example.com/thumb1.jpg",
      width: 100,
      height: 100,
      mediumUrl: "https://example.com/medium1.jpg",
      highUrl: "https://example.com/high1.jpg",
    },
  ];

  it("should fetch images successfully", async () => {
    mockFetchImages.mockResolvedValueOnce(mockImages);

    const { result } = renderHook(() =>
      useImageList(1, 10, 2, true)
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();

    // Wait until data updates
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockImages);
    expect(result.current.error).toBeNull();
  });

  it("should handle fetch error", async () => {
    mockFetchImages.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() =>
      useImageList(1, 10, 2, true)
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe("Network error");
  });

  it("should cancel request on unmount", () => {
    const abortError = new DOMException("Aborted", "AbortError");
    mockFetchImages.mockRejectedValueOnce(abortError);

    const { unmount } = renderHook(() => useImageList(1, 10));

    unmount();

    expect(mockFetchImages).toHaveBeenCalled();
  });
});
