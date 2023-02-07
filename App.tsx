import { StatusBar } from "expo-status-bar";
import { LoginScreen } from "./src/screens/LogInScreen";
import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SignUpScreen } from "./src/screens/SignUpScreen";
import { EditProfileScreen } from "./src/screens/EditProfileScreen";

const Stack = createNativeStackNavigator();

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
			<StatusBar style="auto" />
			<NavigationContainer theme={MyTheme}>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name="LogInScreen" component={LoginScreen} />
					<Stack.Screen
						name="SignUpScreen"
						component={SignUpScreen}
					/>
					<Stack.Screen
						name="EditProfileScreen"
						component={EditProfileScreen}
					/>
				</Stack.Navigator>
			</NavigationContainer>
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
