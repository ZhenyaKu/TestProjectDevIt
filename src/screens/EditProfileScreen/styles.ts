import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";

export const editProfileScreenStyles = StyleSheet.create({
	logOutBtn: {
		position: "absolute",
		fontFamily: "Poppins-Medium",
		fontSize: 16,
		lineHeight: 24,
		color: "#FFC612",
		right: normalize(1),
	},
	screenTitle: {
		fontSize: 18,
		lineHeight: 27,
		color: "#1F1D1D",
		alignSelf: "center",
	},
	userName: {
		fontFamily: "Poppins-Medium",
		fontSize: 24,
		lineHeight: 36,
		alignSelf: "center",
		color: "#1F1D1D",
	},
	userPosition: {
		fontFamily: "Poppins-Medium",
		fontSize: 14,
		lineHeight: 21,
		alignSelf: "center",
		color: "#9795A4",
	},
	inputsContainer: {
		marginTop: normalize(10),
	},
	avatarRow: {
		flexDirection: "row",
		paddingTop: normalize(12),
		paddingBottom: normalize(10),
		justifyContent: "center",
	},
	avatar: {
		width: normalize(70),
		height: normalize(70),
		borderRadius: normalize(50),
	},
	editPhotoIcon: {
		position: "absolute",
		bottom: normalize(11),
		right: normalize(-1),
	},
});
