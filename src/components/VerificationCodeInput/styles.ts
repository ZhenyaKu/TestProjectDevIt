import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";

export const verificationCodeInputStyles = StyleSheet.create({
	container: {
		marginVertical: normalize(20),
	},
	codeFieldRoot: {
		width: "100%",
		paddingRight: normalize(25),
	},
	title: {
		fontSize: normalize(14),
		lineHeight: normalize(21),
		color: "#9795A4",
		fontFamily: "Poppins-Medium",
		marginBottom: normalize(15),
	},
	cellRoot: {
		width: normalize(48),
		height: normalize(48),
		borderColor: "#D7D7D7",
		justifyContent: "center",
		borderWidth: normalize(1),
		borderRadius: normalize(15),
	},
	cellText: {
		color: "#1F1D1D",
		fontSize: 16,
		textAlign: "center",
	},
	focusCell: {
		borderColor: "#FFC612",
		borderWidth: normalize(1),
	},
});
