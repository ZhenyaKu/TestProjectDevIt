import { PropsWithChildren } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { textLinkButtonStyles } from "./styles";

interface IProps {
	leftDescription?: string;
	onPress: () => void;
}

export const TextLinkButton = ({
	leftDescription,
	onPress,
	children,
}: PropsWithChildren<IProps>) => {
	return (
		<View style={textLinkButtonStyles.conteinerBtn}>
			<Text style={textLinkButtonStyles.description}>
				{leftDescription}
			</Text>
			<TouchableOpacity onPress={onPress}>
				<Text style={textLinkButtonStyles.titleBtn}>{children}</Text>
			</TouchableOpacity>
		</View>
	);
};
