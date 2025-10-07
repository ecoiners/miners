import { useFonts } from "expo-font";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { useCallback, useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";
import ClerkAndConvexProvider from "@/components/clerk-convex-provider";
import InitialLayout from "@/components/initial-layout";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		"JetBrainsMono-Medium":require("../assets/fonts/JetBrainsMono-Medium.ttf")
	});
	
	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) await SplashScreen.hideAsync();
	}, [fontsLoaded]);
	
	  // update the native navigation bar on Android.
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#000000");
      NavigationBar.setButtonStyleAsync("light");
    }
  }, []);
	
	return (
		<ClerkAndConvexProvider>
		  <SafeAreaProvider>
			  <SafeArewView style={{flex:1, backgroundColor:"#000"}} onLayout={onLayoutRootView}>
				  <InitialLayout />
				</SafeAreaView>
			</SafeAreaProvider>
			<StatusBar style="light" />
		</ClerkAndConvexProvider>
	);
};