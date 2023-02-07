import React, { useEffect, useCallback, useState } from "react";
import {
	View,
	TouchableWithoutFeedback,
	Keyboard,
	Text,
	TouchableOpacity,
	Image,
	ScrollView,
	Alert,
} from "react-native";
import { useFormik } from "formik";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppRouteNames, AppStackParams } from "../../navigators/types";
import * as ImagePicker from "expo-image-picker";
import * as SQLite from "expo-sqlite";
import { TextInput } from "../../components/TextInput";
import { EditPhotoIcon } from "../../components/Icons";
import { AppLayout } from "../../components/AppLayout";
import { BigBottomButton } from "../../components/BigBottomButton";
import { ValidationSchema } from "./validationSchema";
import { editProfileScreenStyles } from "./styles";

const avatarPlaceholder = require("../../../assets/Photo.png");

export const EditProfileScreen = () => {
	const db = SQLite.openDatabase("MainDB");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [position, setPosition] = useState("");
	const [skype, setSkype] = useState("");
	const [image, setImage] = useState("");
	const navigation = useNavigation<NavigationProp<AppStackParams>>();

	const toLogInScreen = useCallback(() => {
		navigation.navigate(AppRouteNames.LogInScreen);
	}, [navigation]);

	useEffect(() => {
		getData();
	}, []);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	const getData = () => {
		try {
			db.transaction((tx) => {
				tx.executeSql(
					"SELECT Name, Phone, Email, Position, Skype FROM Users",
					[],
					(tx, results) => {
						let len = results.rows.length;
						if (len > 0) {
							let userName = results.rows.item(0).Name;
							let userPhone = results.rows.item(0).Phone;
							let userEmail = results.rows.item(0).Email;
							let userPosition = results.rows.item(0).Position;
							let userSkype = results.rows.item(0).Skype;
							setName(userName);
							setPhone(userPhone);
							setEmail(userEmail);
							setPosition(userPosition);
							setSkype(userSkype);
						}
					}
				);
			});
		} catch (error) {
			console.log(error);
		}
	};

	const updateData = async () => {
		try {
			db.transaction((tx) => {
				tx.executeSql(
					"UPDATE Users SET Name=?, Phone=?, Email=?, Position=?, Skype=? ",
					[name, phone, email, position, skype],
					() => {
						Alert.alert(
							"Success!",
							"Your profile has been updated."
						);
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
				name: name || "",
				email: email || "",
				phone: phone || "",
				position: position || "",
				skype: skype || "",
			},
			validateOnBlur: true,
			validateOnChange: true,
			onSubmit: () => {
				updateData();
			},
		});

	const hasErrorEmail = touched.email && !!errors.email;
	const hasErrorPhone = touched.phone && !!errors.phone;
	const hasErrorName = touched.name && !!errors.name;

	return (
		<AppLayout withHeader={false}>
			<TouchableOpacity onPress={toLogInScreen}>
				<Text style={editProfileScreenStyles.logOutBtn}>Log out</Text>
				<Text style={editProfileScreenStyles.screenTitle}>
					Edit profile
				</Text>

				<TouchableWithoutFeedback
					onPress={() => Keyboard.dismiss()}
					accessible={false}
				>
					<View style={editProfileScreenStyles.avatarRow}>
						<TouchableOpacity
							onPress={pickImage}
							style={editProfileScreenStyles.avatarRow}
						>
							{image && (
								<Image
									source={{ uri: image }}
									style={editProfileScreenStyles.avatar}
								/>
							)}
							{/* <Image
								source={avatarPlaceholder}
								style={editProfileScreenStyles.avatar}
							/> */}
							<EditPhotoIcon
								style={editProfileScreenStyles.editPhotoIcon}
							/>
						</TouchableOpacity>
					</View>
				</TouchableWithoutFeedback>
				<Text style={editProfileScreenStyles.userName}>{name}</Text>
				<Text style={editProfileScreenStyles.userPosition}>
					{position}
				</Text>
			</TouchableOpacity>
			<ScrollView>
				<TouchableWithoutFeedback
					onPress={() => Keyboard.dismiss()}
					accessible={false}
				>
					<View style={editProfileScreenStyles.inputsContainer}>
						<TextInput
							title="Name"
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
							title="Email"
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
							title="Phone"
							editable
							autoCorrect={false}
							spellCheck={false}
							value={values.phone}
							onChangeText={handleChange("phone")}
							errorText={errors.phone}
							hasError={hasErrorPhone}
							autoCapitalize="none"
						/>
						<TextInput
							title="Position"
							editable
							autoCorrect={false}
							spellCheck={false}
							value={values.position}
							onChangeText={handleChange("position")}
							errorText={errors.position}
							autoCapitalize="none"
						/>
						<TextInput
							title="Skype"
							editable
							autoCorrect={false}
							spellCheck={false}
							value={values.skype}
							onChangeText={handleChange("skype")}
							errorText={errors.skype}
							autoCapitalize="none"
						/>
					</View>
				</TouchableWithoutFeedback>
			</ScrollView>
			<BigBottomButton disabled={!isValid} onPress={() => handleSubmit()}>
				Save
			</BigBottomButton>
		</AppLayout>
	);
};
