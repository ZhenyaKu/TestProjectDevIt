import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";

export const bigBottomButtonStyles = StyleSheet.create({
	conteinerBtn: {
		backgroundColor: "#FFC612",
		width: "100%",
		paddingVertical: normalize(17),
		borderRadius: normalize(20),
		marginTop: normalize(30),
	},
	titleBtn: {
		fontFamily: "Poppins-Medium",
		fontSize: 18,
		lineHeight: 27,
		alignSelf: "center",
		color: "#1F1D1D",
	},
});
