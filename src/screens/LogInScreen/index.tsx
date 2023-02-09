import React, { useCallback, useContext } from "react";
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
import { UserContext } from "../../context/UserContext";

export const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<AppStackParams>>();

  const goToSignUpScreen = useCallback(() => {
    navigation.navigate(AppRouteNames.SignUpScreen);
  }, [navigation]);
  const goToEditProfileScreen = useCallback(() => {
    navigation.navigate(AppRouteNames.EditProfileScreen);
  }, [navigation]);
  const { login } = useContext(UserContext);

  const { handleChange, handleSubmit, values, isValid, errors, touched } =
    useFormik({
      validationSchema: ValidationSchema,
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: async ({ email, password }) => {
        try {
          await login(email, password);

          goToEditProfileScreen();
        } catch (error) {
          Alert.alert("User does not exist!", "Please, create an account.");
        }
      },
    });

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
            hasError={touched.email && !!errors.email}
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
            hasError={touched.password && !!errors.password}
            autoCapitalize="none"
          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity
        onPress={() => Alert.alert("Info", "Please, check your email?!")}
      >
        <Text style={logInScreenStyles.forgotPasswordBtn}>
          Forgot password?
        </Text>
      </TouchableOpacity>
      <View style={logInScreenStyles.btnContainer}>
        <BigBottomButton onPress={handleSubmit}>Log in</BigBottomButton>
        <TextLinkButton leftDescription="New User?" onPress={goToSignUpScreen}>
          Create Account
        </TextLinkButton>
      </View>
    </AppLayout>
  );
};
