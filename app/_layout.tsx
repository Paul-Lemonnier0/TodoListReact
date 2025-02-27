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

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <TodoListProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <ThemedView style={{ flex: 1, paddingHorizontal: 20 }}>
              <SafeAreaView style={{ flex: 1 }}>
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
