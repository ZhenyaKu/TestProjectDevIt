import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";

export const logInScreenStyles = StyleSheet.create({
	inputContainer: {
		marginTop: normalize(30),
	},
	forgotPasswordBtn: {
		fontFamily: "Poppins-Regular",
		fontSize: 14,
		lineHeight: 21,
		alignSelf: "flex-end",
		color: "#9795A4",
	},
	btnContainer: {
		marginTop: normalize(20),
	},
});
