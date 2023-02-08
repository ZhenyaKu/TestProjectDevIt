import React, { useCallback, useContext, useEffect, useState } from "react";
import {
	View,
	TouchableWithoutFeedback,
	Keyboard,
	Text,
	TouchableOpacity,
	Alert,
} from "react-native";
import { useFormik } from "formik";
import { ValidationSchema } from "./validationSchema";
import { logInScreenStyles } from "./styles";
import { TextInput } from "../../components/TextInput";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppRouteNames, AppStackParams } from "../../navigators/types";
import { BigBottomButton } from "../../components/BigBottomButton";
import { AppLayout } from "../../components/AppLayout";
import { TextLinkButton } from "../../components/TextLinkButton";
import { AppContext } from "../../components/AppContext";
import * as SQLite from "expo-sqlite";

export const LoginScreen = () => {
	const db = SQLite.openDatabase("db.db");
	const navigation = useNavigation<NavigationProp<AppStackParams>>();

	const toSignUpScreen = useCallback(() => {
		navigation.navigate(AppRouteNames.SignUpScreen);
	}, [navigation]);
	const toEditProfileScreen = useCallback(() => {
		navigation.navigate(AppRouteNames.EditProfileScreen);
	}, [navigation]);
	const { setCurrentEmail } = useContext(AppContext);

	useEffect(() => {
		createTable();
	}, []);

	const createTable = () => {
		db.transaction((tx) => {
			tx.executeSql(
				"CREATE TABLE IF NOT EXISTS " +
					"Users " +
					"(ID INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, email VARCHAR, password VARCHAR, phone VARCHAR, position VARCHAR, skype VARCHAR)"
			);
		});
	};

	const { handleChange, handleSubmit, values, isValid, errors, touched } =
		useFormik({
			validationSchema: ValidationSchema,
			initialValues: {
				email: "",
				password: "",
			},
			onSubmit: async ({ email, password }) => {
				try {
					db.transaction((tx) => {
						tx.executeSql(
							"SELECT * FROM Users WHERE email = $1 AND password = $2 LIMIT 1",
							[email, password],
							(tx, results) => {
								let len = results.rows.length;
								if (len > 0) {
									setCurrentEmail(email);
									toEditProfileScreen();
								} else {
									Alert.alert(
										"User does not exist!",
										"Please,create account."
									);
								}
							}
						);
					});
				} catch (error) {
					console.log(error);
				}
			},
		});

	const hasErrorEmail = touched.email && !!errors.email;
	const hasErrorPassword = touched.password && !!errors.password;

	return (
		<AppLayout title="Log in to woorkroom">
			<TouchableWithoutFeedback
				onPress={() => Keyboard.dismiss()}
				accessible={false}
			>
				<View style={logInScreenStyles.inputContainer}>
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

					<TextInput
						title="Password"
						isPassword
						placeholder="Enter your password"
						editable
						autoCorrect={false}
						spellCheck={false}
						value={values.password}
						onChangeText={handleChange("password")}
						errorText={errors.password}
						hasError={hasErrorPassword}
						autoCapitalize="none"
					/>
				</View>
			</TouchableWithoutFeedback>
			<TouchableOpacity
				onPress={() =>
					Alert.alert("Info", "Please, check your email?!")
				}
			>
				<Text style={logInScreenStyles.forgotPasswordBtn}>
					Forgot password?
				</Text>
			</TouchableOpacity>
			<View style={logInScreenStyles.btnContainer}>
				<BigBottomButton
					disabled={!isValid}
					onPress={() => handleSubmit()}
				>
					Log in
				</BigBottomButton>
				<TextLinkButton
					leftDescription="New User?"
					onPress={toSignUpScreen}
				>
					Create Account
				</TextLinkButton>
			</View>
		</AppLayout>
	);
};
