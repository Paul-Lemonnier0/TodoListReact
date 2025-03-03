import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from '@/hooks/useColorScheme';
import HomeScreen from './HomeScreen';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native';
import { TodoListProvider } from '@/context/TodoListContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

/**
 * The main component of the application
 * @returns
 */
export default function RootLayout() {

  // Get the device's color scheme
  const colorScheme = useColorScheme();

  // Load the custom font
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Hide the splash screen when the app is loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // While the font is not loaded, we don't render the app
  if (!loaded) {
    return null;
  }

  // Render the app
  return (
    /* Wraps the app in a gesture handler view, helping us to intercept the user movements (such as closing a bottom sheet) */
    <GestureHandlerRootView style={{flex: 1}}>
      {/* Wraps the app in a bottom sheet provider, allowing us to use bottom sheets in the app */}
      <BottomSheetModalProvider>
        {/* Wraps the app in a todo list provider, allowing us to manage the todo list state and accessing to the global variables and methods globally in the code */}
        <TodoListProvider>
          {/* Wraps the app in a theme provider, allowing us to use the theme colors and styles in the app */}
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <ThemedView style={{ flex: 1, paddingHorizontal: 20 }}>
              {/* Wraps the app in a safe area view : it will render the rest of the app avoiding the status bar zone of the phone and sets a default bottom padding */}
              <SafeAreaView style={{ flex: 1 }}>
                {/* Renders the main screen of the app */}
                <HomeScreen/>
              </SafeAreaView>
            </ThemedView>
            {/* on force ici pour avoir le même rendu sur chaque apps */}
            <StatusBar style="dark" />
            {/* <StatusBar style="auto" /> */}
          </ThemeProvider>
        </TodoListProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
