import React from "react";
import { Text, View, TextInput as TI, TextInputProps } from "react-native";
import { Divider } from "../Divider";
import Styles from "./styles";

interface IProps extends TextInputProps {
	title?: string;
	errorText?: string;
	hasError?: boolean;
}

export const TextInput = ({
	title,
	errorText,
	hasError,
	...textInputProps
}: IProps) => {
	return (
		<View style={Styles.container}>
			{title && <Text style={Styles.title}>{title}</Text>}
			<TI
				{...textInputProps}
				style={[
					Styles.textInput,
					...(textInputProps.editable
						? [Styles.textInput]
						: [Styles.disabled]),
					...(hasError ? [Styles.error] : []),
					textInputProps.style,
				]}
			/>
			{!!errorText && hasError && (
				// <Animation exiting={undefined}>
				<Text style={Styles.errorText}>{errorText}</Text>
				// </Animation>
			)}
		</View>
	);
};
