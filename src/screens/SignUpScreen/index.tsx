import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import {
	View,
	TouchableWithoutFeedback,
	Keyboard,
	Text,
	ScrollView,
} from "react-native";
import { useFormik } from "formik";
import * as SQLite from "expo-sqlite";
import PhoneInput from "react-native-phone-number-input";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppRouteNames, AppStackParams } from "../../navigators/types";
import { VerificationCodeInput } from "../../components/VerificationCodeInput";
import { AppLayout } from "../../components/AppLayout";
import { BigBottomButton } from "../../components/BigBottomButton";
import { TextLinkButton } from "../../components/TextLinkButton";
import { ValidationSchema } from "./validationSchema";
import { formatPhoneNumber } from "./formatPhoneNumber";
import { signUpScreenStyles } from "./styles";
import { TextInput } from "../../components/TextInput";

export const SignUpScreen = () => {
	const db = SQLite.openDatabase("MainDB");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [formattedPhone, setFormattedPhone] = useState("");
	const [showValidationError, setShowValidationError] = useState(false);
	const phoneInput = useRef<PhoneInput>(null);
	const navigation = useNavigation<NavigationProp<AppStackParams>>();

	const toEditProfileScreen = useCallback(() => {
		navigation.navigate(AppRouteNames.EditProfileScreen);
	}, [navigation]);
	const toLogInScreen = useCallback(() => {
		navigation.navigate(AppRouteNames.LogInScreen);
	}, [navigation]);

	useEffect(() => {
		getData();
	}, []);

	const getData = () => {
		try {
			db.transaction((tx) => {
				tx.executeSql("SELECT Email FROM Users", [], (tx, results) => {
					let len = results.rows.length;
					if (len > 0) {
						let userEmail = results.rows.item(0).Email;
						setEmail(userEmail);
					}
				});
			});
		} catch (error) {
			console.log(error);
		}
	};

	const createProfile = ({ name, email, password, phone }: any) => {
		db.transaction((tx) => {
			tx.executeSql(
				"INSERT INTO Users (Name, Email, Password, Phone) VALUES (?,?,?,?)",

				[name, email, password, phone]
			);
			tx.executeSql("SELECT * from Users", [], (_: any, { rows }: any) =>
				console.log(JSON.stringify(rows))
			);
		});
		toEditProfileScreen();
	};

	const {
		handleChange,
		handleSubmit,
		handleBlur,
		values,
		isValid,
		errors,
		touched,
	} = useFormik({
		validationSchema: ValidationSchema,
		initialValues: {
			name: "",
			email: email || "",
			password: "",
			confirmPassword: "",
			code: "",
		},
		validateOnBlur: true,
		validateOnChange: true,
		onSubmit: ({ name, email, password }) => {
			const checkValid =
				phoneInput.current?.isValidNumber(formattedPhone);
			setShowValidationError(!checkValid || false);

			if (checkValid) {
				createProfile({ name, email, password, phone });
			}
		},
	});

	const isInvalidPhone = !phoneInput.current?.isValidNumber(phone);

	const isDisabled = useMemo(() => isInvalidPhone, [isInvalidPhone]);

	const hasErrorEmail = touched.email && !!errors.email;
	const hasErrorPassword = touched.password && !!errors.password;
	const hasErrorConfirmPassword =
		touched.confirmPassword && !!errors.confirmPassword;
	const hasErrorName = touched.name && !!errors.name;
	const hasErrorCode = touched.code && !!errors.code;

	return (
		<ScrollView>
			<AppLayout title="Sign Up To woorkroom">
				<TouchableWithoutFeedback
					onPress={() => Keyboard.dismiss()}
					accessible={false}
				>
					<View style={signUpScreenStyles.inputsContainer}>
						<View style={signUpScreenStyles.phoneContainer}>
							<Text style={signUpScreenStyles.title}>
								Phone Number
							</Text>

							<PhoneInput
								ref={phoneInput}
								value={phone}
								layout="second"
								textInputProps={{ value: phone, maxLength: 13 }}
								defaultCode="US"
								onChangeText={(text) => {
									setPhone(formatPhoneNumber(text));
								}}
								onChangeFormattedText={(text) => {
									setFormattedPhone(text);
								}}
								autoFocus
								containerStyle={
									signUpScreenStyles.phoneInputContainer
								}
								textContainerStyle={[
									signUpScreenStyles.textContainer,
									showValidationError
										? signUpScreenStyles.textContainerError
										: signUpScreenStyles.textContainerStyle,
								]}
								textInputStyle={
									signUpScreenStyles.textInputStyle
								}
								codeTextStyle={signUpScreenStyles.codeTextStyle}
								countryPickerButtonStyle={
									signUpScreenStyles.countryPickerButton
								}
							/>
						</View>
						<VerificationCodeInput
							title="Code"
							value={values.code}
							setValue={handleChange("code")}
							textInputProps={{
								onBlur: handleBlur("code"),
								autoFocus: true,
								onEndEditing: () => console.log(values.code),
							}}
							touchableOpacityStyle={
								hasErrorCode
									? signUpScreenStyles.inputError
									: {}
							}
						/>

						<TextInput
							title="Your name"
							placeholder="Enter your name"
							editable
							autoCorrect={false}
							spellCheck={false}
							value={values.name}
							onChangeText={handleChange("name")}
							errorText={errors.name}
							hasError={hasErrorName}
							autoCapitalize="none"
						/>

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

						<TextInput
							title="Confirm Password"
							isPassword
							placeholder="Confirm your password"
							editable
							autoCorrect={false}
							spellCheck={false}
							value={values.confirmPassword}
							onChangeText={handleChange("confirmPassword")}
							errorText={errors.confirmPassword}
							hasError={hasErrorConfirmPassword}
							autoCapitalize="none"
						/>
					</View>
				</TouchableWithoutFeedback>

				<BigBottomButton
					disabled={!isValid || isDisabled}
					onPress={() => handleSubmit()}
				>
					Next
				</BigBottomButton>
				<TextLinkButton
					leftDescription="Have Account?"
					onPress={toLogInScreen}
				>
					Log in
				</TextLinkButton>
			</AppLayout>
		</ScrollView>
	);
};
