import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";

export default StyleSheet.create({
	container: {
		marginBottom: normalize(20),
		alignSelf: "stretch",
		width: "100%",
	},
	title: {
		fontSize: normalize(14),
		lineHeight: normalize(21),
		color: "#9795A4",
		fontFamily: "Poppins-Medium",
		marginBottom: normalize(3),
	},
	textInput: {
		color: "#1F1D1D",
		paddingVertical: normalize(12),
		borderColor: "#D7D7D7",
		borderBottomWidth: normalize(1),
		fontFamily: "Poppins-Medium",
		fontSize: normalize(16),
		lineHeight: normalize(24),
	},
	disabled: {
		backgroundColor: "#D7D7D7",
	},

	error: {
		borderColor: "red",
	},

	errorText: {
		color: "red",
	},
});
