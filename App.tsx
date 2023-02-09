import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserContextProvider } from "./src/context/UserContext";
import { DBContextProvider } from "./src/context/DBContext";
import { MainStack } from "./src/navigators/main-stack";

export default function App() {
	const [fontsLoaded] = useFonts({
		"Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
		"Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<SafeAreaProvider onLayout={onLayoutRootView}>
			<DBContextProvider>
				<UserContextProvider>
					<StatusBar style="auto" />
					<NavigationContainer theme={MyTheme}>
						<MainStack />
					</NavigationContainer>
				</UserContextProvider>
			</DBContextProvider>
		</SafeAreaProvider>
	);
}

const MyTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: "#fff",
	},
};
