import { PropsWithChildren } from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { bigBottomButtonStyles } from "./styles";

interface IProps extends TouchableOpacityProps {
	isDisable?: boolean;
	onPress: () => void;
}

export const BigBottomButton = ({
	isDisable,
	onPress,
	children,
	...props
}: PropsWithChildren<IProps>) => {
	return (
		<TouchableOpacity
			style={[
				bigBottomButtonStyles.conteinerBtn,
				props.disabled && { backgroundColor: "#D7D7D7" },
			]}
			onPress={isDisable ? () => {} : onPress}
			{...props}
		>
			<Text style={bigBottomButtonStyles.titleBtn}>{children}</Text>
		</TouchableOpacity>
	);
};
