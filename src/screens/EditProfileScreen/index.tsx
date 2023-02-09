import React, { useCallback, useState, useContext } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useFormik } from "formik";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppRouteNames, AppStackParams } from "../../navigators/types";
import * as ImagePicker from "expo-image-picker";
import { TextInput } from "../../components/TextInput";
import { EditPhotoIcon } from "../../components/Icons";
import { AppLayout } from "../../components/AppLayout";
import { BigBottomButton } from "../../components/BigBottomButton";
import { ValidationSchema } from "./validationSchema";
import { editProfileScreenStyles } from "./styles";
import { UserContext } from "../../context/UserContext";

const avatarPlaceholder = require("../../../assets/Photo.png");

export const EditProfileScreen = () => {
  const [image, setImage] = useState("");
  const { currentUser, updateUser } = useContext(UserContext);
  const { name, email, phone, position, skype } = currentUser || {};
  const navigation = useNavigation<NavigationProp<AppStackParams>>();

  const toLogInScreen = useCallback(() => {
    navigation.navigate(AppRouteNames.LogInScreen);
  }, [navigation]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    validationSchema: ValidationSchema,
    initialValues: {
      name: name || "",
      email: email || "",
      phone: phone || "",
      position: position || "",
      skype: skype || "",
    },
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      updateUser({
        id: currentUser!.id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        position: values.position,
        skype: values.skype,
      });
    },
  });

  const hasErrorEmail = touched.email && !!errors.email;
  const hasErrorPhone = touched.phone && !!errors.phone;
  const hasErrorName = touched.name && !!errors.name;

  return (
    <AppLayout withHeader={false}>
      <TouchableOpacity onPress={toLogInScreen}>
        <Text style={editProfileScreenStyles.logOutBtn}>Log out</Text>
      </TouchableOpacity>
      <Text style={editProfileScreenStyles.screenTitle}>Edit profile</Text>

      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}
      >
        <View style={editProfileScreenStyles.avatarRow}>
          <TouchableOpacity
            onPress={pickImage}
            style={editProfileScreenStyles.avatarRow}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={editProfileScreenStyles.avatar}
              />
            ) : (
              <Image
                source={avatarPlaceholder}
                style={editProfileScreenStyles.avatar}
              />
            )}
            <EditPhotoIcon style={editProfileScreenStyles.editPhotoIcon} />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
      <Text style={editProfileScreenStyles.userName}>{name}</Text>
      <Text style={editProfileScreenStyles.userPosition}>{position}</Text>

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
      <BigBottomButton onPress={() => handleSubmit()}>Save</BigBottomButton>
    </AppLayout>
  );
};
