import { Platform, StyleSheet } from "react-native";
import normalize from "react-native-normalize";

export const textLinkButtonStyles = StyleSheet.create({
	conteinerBtn: {
		flexDirection: "row",
		alignSelf: "center",
		marginTop: normalize(35),
		marginBottom: Platform.OS === "android" ? 30 : 0,
	},
	description: {
		fontFamily: "Poppins-Regular",
		fontSize: 14,
		lineHeight: 21,
		color: "#9795A4",
		paddingRight: normalize(5),
	},
	titleBtn: {
		fontFamily: "Poppins-Regular",
		fontSize: 14,
		lineHeight: 21,
		color: "#FFC612",
	},
});
