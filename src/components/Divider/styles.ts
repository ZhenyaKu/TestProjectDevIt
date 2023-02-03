import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";

export const dividerStyles = StyleSheet.create({
	container: {
		borderColor: "#E6E6E6",
		borderWidth: normalize(1),
		margin: normalize(-2),
		width: "100%",
		alignSelf: "center",
		borderRadius: normalize(1),
	},
});
