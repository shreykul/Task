import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { act } from "react-test-renderer";
import ImageCard from "../components/ui/ImageCard";
import { ThemeProviderCustom } from "../components/ui/theme-context";
import { ImageType } from "../utils/types";

const mockItem: ImageType = {
  id: "1",
  name: "Test Image",
  thumbnailUrl: "https://example.com/thumb.jpg",
  width: 100,
  height: 100,
  mediumUrl: "https://example.com/medium.jpg",
  highUrl: "https://example.com/high.jpg",
};

const mockProps = {
  item: mockItem,
  navigation: { navigate: jest.fn() },
  data: [mockItem],
  favorites: [],
  refreshFavorites: jest.fn(),
};

describe("ImageCard", () => {
  it("renders image and text", () => {
    const { getByText } = render(
      <ThemeProviderCustom>
        <ImageCard {...mockProps} />
      </ThemeProviderCustom>
    );

    expect(getByText("Test Image")).toBeTruthy();
  });

  it("toggles favorite on button press", async () => {
    const { getByTestId } = render(
      <ThemeProviderCustom>
        <ImageCard {...mockProps} />
      </ThemeProviderCustom>
    );

    const favButton = getByTestId("favorite-button");

    await act(async () => {
      fireEvent.press(favButton);
    });

    expect(mockProps.refreshFavorites).toHaveBeenCalled();
  });
});
