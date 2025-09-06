import { ImageType } from '@/utils/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@favorite_images';

export const getFavorites = async (): Promise<ImageType[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to load favorites', e);
    return [];
  }
};

export const addFavorite = async (image: ImageType) => {
  try {
    const favorites = await getFavorites();
    const exists = favorites.find((img) => img.id === image.id);
    if (!exists) {
      favorites.push(image);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (e) {
    console.error('Failed to add favorite', e);
  }
};

export const removeFavorite = async (imageId: string) => {
  try {
    const favorites = await getFavorites();
    const newFavs = favorites.filter((img) => img.id !== imageId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavs));
  } catch (e) {
    console.error('Failed to remove favorite', e);
  }
};

export const isFavorite = async (imageId: string): Promise<boolean> => {
  const favorites = await getFavorites();
  return favorites.some((img) => img.id === imageId);
};
