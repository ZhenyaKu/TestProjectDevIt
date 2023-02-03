import React, { useState } from "react";
import {
	View,
	TouchableWithoutFeedback,
	Keyboard,
	SafeAreaView,
	Text,
	TouchableOpacity,
	Pressable,
} from "react-native";
import { useFormik } from "formik";
import { ValidationSchema } from "./validationSchema";
import { logInScreenStyles } from "./styles";
import { TextInput } from "../../components/TextInput";
import { EyeCloseIcon, LogoIcon } from "../../components/Icons";
// import { useRefreshOnFocus } from "hooks/use-refresh-on-focus";
import { EyeOpenIcon } from "../../components/Icons/index";

export const LoginScreen = () => {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const { handleChange, handleSubmit, values, isValid, errors, touched } =
		useFormik({
			validationSchema: ValidationSchema,
			initialValues: {
				email: "",
				password: "",
			},
			onSubmit: () => {
				console.log("save");
			},
		});

	const handleClickShowPassword = () => {
		setPasswordVisible((prev) => !prev);
	};

	const hasErrorEmail = touched.email && !!errors.email;
	const hasErrorPassword = touched.password && !!errors.password;

	return (
		<View style={{ flex: 1, marginTop: 50 }}>
			<LogoIcon style={{ alignSelf: "center" }} />
			<Text
				style={{
					marginTop: 110,
					fontFamily: "Poppins-Medium",
					fontSize: 24,
					lineHeight: 36,
					alignSelf: "center",
					color: "#1F1D1D",
				}}
			>
				Log in to woorkroom
			</Text>
			<TouchableWithoutFeedback
				onPress={() => Keyboard.dismiss()}
				accessible={false}
			>
				<View
					style={{
						marginTop: 50,
					}}
				>
					<TextInput
						title="Your Email"
						placeholder="Enter your email"
						editable
						autoCorrect={false}
						spellCheck={false}
						value={values.email}
						onChangeText={handleChange("email")}
						errorText={errors.email}
						hasError={hasErrorEmail}
						autoCapitalize="none"
						keyboardType="email-address"
					/>
					<View style={{ flexDirection: "row", flexWrap: "nowrap" }}>
						<TextInput
							title="Password"
							placeholder="Enter your password"
							editable
							autoCorrect={false}
							spellCheck={false}
							value={values.password}
							onChangeText={handleChange("password")}
							errorText={errors.password}
							hasError={hasErrorPassword}
							autoCapitalize="none"
							secureTextEntry={passwordVisible}
						/>
						<Pressable
							onPress={handleClickShowPassword}
							style={{
								position: "absolute",
								right: 2,
								bottom: 32,
							}}
						>
							{passwordVisible ? (
								<EyeCloseIcon />
							) : (
								<EyeOpenIcon />
							)}
						</Pressable>
					</View>
				</View>
			</TouchableWithoutFeedback>
			<TouchableOpacity onPress={() => console.log("press")}>
				<Text
					style={{
						fontFamily: "Poppins-Regular",
						fontSize: 14,
						lineHeight: 21,
						alignSelf: "flex-end",
						color: "#9795A4",
					}}
				>
					Forgot password?
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={logInScreenStyles.button}
				onPress={() => console.log("press")}
			>
				<Text
					style={{
						fontFamily: "Poppins-Medium",
						fontSize: 18,
						lineHeight: 27,
						alignSelf: "center",
						color: "#1F1D1D",
					}}
				>
					Log in
				</Text>
			</TouchableOpacity>
			<View
				style={{
					flexDirection: "row",
					alignSelf: "center",
					marginTop: 35,
				}}
			>
				<TouchableOpacity onPress={() => console.log("press")}>
					<Text
						style={{
							fontFamily: "Poppins-Regular",
							fontSize: 14,
							lineHeight: 21,
							color: "#9795A4",
							paddingRight: 5,
						}}
					>
						New User?
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => console.log("press")}>
					<Text
						style={{
							fontFamily: "Poppins-Regular",
							fontSize: 14,
							lineHeight: 21,
							color: "#FFC612",
						}}
					>
						Create Account
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
