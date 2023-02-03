import * as Font from "expo-font";

export const useFonts = async () =>
	await Font.loadAsync({
		"Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
		"Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
	});
