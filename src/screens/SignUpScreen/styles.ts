import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";

export const signUpScreenStyles = StyleSheet.create({
	inputsContainer: {
		marginTop: normalize(30),
	},
	phoneContainer: {
		marginVertical: normalize(20),
	},
	phoneInputContainer: {
		width: "100%",
		height: normalize(55),
	},
	title: {
		fontSize: normalize(14),
		lineHeight: normalize(21),
		color: "#9795A4",
		fontFamily: "Poppins-Medium",
		marginBottom: normalize(15),
	},
	textContainer: {
		backgroundColor: "#ffff",
		marginLeft: normalize(25),
		paddingHorizontal: normalize(0),
		borderWidth: normalize(1),
		borderColor: "#D7D7D7",
		borderRadius: 15,
	},
	textContainerStyle: {
		borderColor: "#D7D7D7",
		paddingLeft: normalize(15),
	},
	textContainerError: {
		borderColor: "red",
	},
	textInputStyle: {
		fontFamily: "Poppins-Medium",
		fontSize: 16,
		color: "#1F1D1D",
	},
	codeTextStyle: {
		fontFamily: "Poppins-Medium",
		fontSize: 16,
		color: "#D7D7D7",
	},
	countryPickerButton: {
		borderWidth: normalize(1),
		borderColor: "#D7D7D7",
		borderRadius: 15,
		width: normalize(70),
	},
});
