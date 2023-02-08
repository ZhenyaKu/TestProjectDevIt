import React from "react";
import {
	Text,
	TextInputProps,
	TouchableOpacity,
	View,
	ViewStyle,
} from "react-native";
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { verificationCodeInputStyles } from "./styles";

const CELL_COUNT = 4;

interface VerificationCodeInputProps {
	title: string;
	value?: string;
	setValue: (value: string) => void;
	textInputProps?: TextInputProps;
	touchableOpacityStyle?: ViewStyle;
}

export const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
	title,
	value,
	setValue,
	textInputProps = {},
	touchableOpacityStyle = {},
}: VerificationCodeInputProps) => {
	const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});

	return (
		<View style={verificationCodeInputStyles.container}>
			{!!title && (
				<Text style={verificationCodeInputStyles.title}>{title}</Text>
			)}
			<CodeField
				ref={ref}
				{...props}
				value={value}
				onChangeText={setValue}
				cellCount={CELL_COUNT}
				rootStyle={verificationCodeInputStyles.codeFieldRoot}
				keyboardType="number-pad"
				textContentType="oneTimeCode"
				renderCell={({ index, symbol, isFocused }) => (
					<TouchableOpacity
						onLayout={getCellOnLayoutHandler(index)}
						key={index}
						style={[
							verificationCodeInputStyles.cellRoot,
							isFocused && verificationCodeInputStyles.focusCell,
							touchableOpacityStyle,
						]}
					>
						<Text style={verificationCodeInputStyles.cellText}>
							{symbol || (isFocused ? <Cursor /> : null)}
						</Text>
					</TouchableOpacity>
				)}
				{...textInputProps}
			/>
		</View>
	);
};
