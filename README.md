# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```
2 Copy the .env.example contents to .env file.
 
3. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

Note: This project has been running using expo prebuild to support custom modules.

## Architecture Overview

This app is built with React Native + Expo for cross-platform development.
The structure is organized as follows:

- components/ → Reusable UI components (ImageCard, ThemedText, Header, etc.)

- app/ → App screens (Home, ImageViewer, Favorites, Settings)

- hooks/ → Custom hooks for fetching data, managing favorites, and theme

- services/ → API layer for fetching images

- store/ → Context or state management logic (favorites, theme)

- utils/ → Helper functions (formatters, constants)

- constants/ → Static values (Colors,String)


Trade-offs:

Using Expo provides rapid development and easier testing across platforms, but increases bundle size.

Using custom modules is complex in expo compared to bare react native.

Kept minimal dependencies to reduce memory footprint, but limited advanced features like prefetching and persistent cache.

## Steps to make the scrolling smoother

- I used legendList instead of using flashlist or flatlist which is better in terms of performance in my opinion.
- Using recycleItems in legendList made it smoother as it instead of destroying views when we scroll, it keeps them and just change the content in the same view.
- While drawDistance prop helped in minimizing the blank space if the user scrolls too fast.


## Known limitations

- Currently, it doesn't support offline mode in which it can show last viewed images.
- Sometimes the layout shift can disrupt the image sequence due to fast scrolling.

## Next Steps
- Add persistent offline storage (e.g., AsyncStorage with React Query cache).

- Improve accessibility (screen reader, larger font scaling).

- Add E2E tests with Detox/Expo E2E.

- Add user analytics in Settings (toggle for debug/analytics).

- Polish animations and transitions.

## Screen Recording of this app
Sample recording link - https://drive.google.com/file/d/1MyV8CtXW7bzNmWzhX5s8-ebbbwZ1G3xg/view?usp=drive_link
