import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { LoginScreen } from "./src/screens/LogInScreen";
import { useFonts } from "./src/hooks/useFonts";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";

export default function App() {
	const [IsReady, SetIsReady] = useState(false);

	const LoadFonts = async () => {
		await useFonts();
	};

	if (!IsReady) {
		return (
			<AppLoading
				startAsync={LoadFonts}
				onFinish={() => SetIsReady(true)}
				onError={() => {}}
			/>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<LoginScreen />
			<StatusBar style="auto" />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		// marginTop: 50,
		marginLeft: 32,
		marginRight: 31,
	},
});
