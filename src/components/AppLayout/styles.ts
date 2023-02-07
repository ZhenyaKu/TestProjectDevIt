import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";

export const appLayoutStyles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: normalize(50),
		marginLeft: normalize(32),
		marginRight: normalize(31),
	},
	logoIcon: {
		alignSelf: "center",
	},
	title: {
		marginTop: normalize(110),
		fontFamily: "Poppins-Medium",
		fontSize: 24,
		lineHeight: 36,
		alignSelf: "center",
		color: "#1F1D1D",
	},
});
