import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	TouchableWithoutFeedback,
	Keyboard,
	Text,
	TouchableOpacity,
	Platform,
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
import * as SQLite from "expo-sqlite";

export const LoginScreen = () => {
	const db = SQLite.openDatabase("MainDB");
	const navigation = useNavigation<NavigationProp<AppStackParams>>();

	useEffect(() => {
		createTable();
		getData();
	}, []);

	const createTable = () => {
		db.transaction((tx: any) => {
			tx.executeSql(
				"CREATE TABLE IF NOT EXISTS " +
					"Users " +
					"(ID INTEGER PRIMARY KEY AUTOINCREMENT, Email VARCHAR, Password VARCHAR, Phone VARCHAR, Position VARCHAR, Skype VARCHAR)"
			);
		});
	};
	const getData = () => {
		try {
			db.transaction((tx) => {
				tx.executeSql(
					"SELECT Email, Password FROM Users",
					[],
					(tx, results) => {
						let len = results.rows.length;
						if (len > 0) {
							toSignUpScreen();
						}
					}
				);
			});
		} catch (error) {
			console.log(error);
		}
	};

	const { handleChange, handleSubmit, values, isValid, errors, touched } =
		useFormik({
			validationSchema: ValidationSchema,
			initialValues: {
				email: "",
				password: "",
			},
			onSubmit: async ({ email, password }) => {
				if (email.length == 0 || password.length == 0) {
					Alert.alert("Warning!", "Please write your data.");
				} else {
					try {
						await db.transaction(async (tx) => {
							await tx.executeSql(
								"INSERT INTO Users (Email, Password) VALUES (?,?)",
								[email, password]
							);
						});
						navigation.navigate(AppRouteNames.EditProfileScreen);
					} catch (error) {
						console.log(error);
					}
				}
			},
		});

	const toSignUpScreen = useCallback(() => {
		navigation.navigate(AppRouteNames.SignUpScreen);
	}, [navigation]);

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
					Alert.alert("Warning!", "Please, check your email?!")
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
