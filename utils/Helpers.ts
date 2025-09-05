import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Share } from 'react-native';
// import RTNMyToast from 'rtn-my-toast/js/NativeMyToast';

export const downloadImage = async (imageUrl: string) => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access storage is required!');
      return;
    }
    const fileName = imageUrl.split('/').pop() || 'downloaded-image.jpg';
    const localUri = FileSystem.cacheDirectory + fileName;
    const { uri } = await FileSystem.downloadAsync(imageUrl, localUri);
    const asset = await MediaLibrary.createAssetAsync(uri);
    await MediaLibrary.createAlbumAsync('Download', asset, false);
    alert('Image saved to Downloads!');
  } catch (error) {
    console.error(error);
    alert('Failed to download image');
  }
};

// export const toastHelper = async(msg:string)=> {
//     await RTNMyToast.showToast(msg);
//   }  

 export const shareImage = async (imageUrl: string) => {
    try {
      await Share.share({
        message: imageUrl,
        url: imageUrl,
      });
    } catch (error) {
      console.error('Error sharing image:', error);
    }
  }; 