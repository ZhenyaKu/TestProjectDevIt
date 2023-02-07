import React, { useState } from "react";
import {
	Text,
	View,
	TextInput as TI,
	TextInputProps,
	Pressable,
} from "react-native";
import { EyeCloseIcon, EyeOpenIcon } from "../Icons";
import { textInputStyles } from "./styles";

interface IProps extends TextInputProps {
	title?: string;
	errorText?: string;
	hasError?: boolean;
	isPassword?: boolean;
}

export const TextInput = ({
	title,
	errorText,
	hasError,
	isPassword,
	...textInputProps
}: IProps) => {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const handleClickShowPassword = () => {
		setPasswordVisible((prev) => !prev);
	};
	return (
		<View style={textInputStyles.container}>
			{title && <Text style={textInputStyles.title}>{title}</Text>}

			{isPassword ? (
				<View>
					<TI
						secureTextEntry={!passwordVisible}
						{...textInputProps}
						style={[
							textInputStyles.textInput,
							...(textInputProps.editable
								? [textInputStyles.textInput]
								: [textInputStyles.disabled]),
							...(hasError ? [textInputStyles.error] : []),
							textInputProps.style,
						]}
					/>
					<Pressable
						onPress={handleClickShowPassword}
						style={{
							position: "absolute",
							right: 2,
							bottom: 12,
						}}
					>
						{passwordVisible ? <EyeCloseIcon /> : <EyeOpenIcon />}
					</Pressable>
				</View>
			) : (
				<TI
					{...textInputProps}
					style={[
						textInputStyles.textInput,
						...(textInputProps.editable
							? [textInputStyles.textInput]
							: [textInputStyles.disabled]),
						...(hasError ? [textInputStyles.error] : []),
						textInputProps.style,
					]}
				/>
			)}

			{!!errorText && hasError && (
				<Text style={textInputStyles.errorText}>{errorText}</Text>
			)}
		</View>
	);
};
