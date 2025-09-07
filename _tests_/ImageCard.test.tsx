import ImageCard from "@/components/ui/ImageCard";
import { ImageType } from "@/utils/types";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

const mockItem: ImageType = {
  id: '1',
  name: "Test Image",
  thumbnailUrl: "https://example.com/thumb.jpg",
  width: 100,
  height: 100,
  mediumUrl: "https://example.com/medium.jpg",
  highUrl: "https://example.com/high.jpg",
};

describe("ImageCard", () => {
  it("renders image and text", () => {
    const { getByText } = render(
      <ImageCard
        item={mockItem}
        navigation={{}}
        data={[mockItem]}
        favorites={[]}
        refreshFavorites={jest.fn()}
      />
    );

    expect(getByText("Test Image")).toBeTruthy();
  });

  it("toggles favorite on button press", () => {
    const refreshFavorites = jest.fn();
    const { getByRole } = render(
      <ImageCard
        item={mockItem}
        navigation={{}}
        data={[mockItem]}
        favorites={[]}
        refreshFavorites={refreshFavorites}
      />
    );

    const button = getByRole("button");
    fireEvent.press(button);

    expect(refreshFavorites).toHaveBeenCalled();
  });
});
