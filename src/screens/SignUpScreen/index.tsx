import React, {
  useCallback,
  useContext,
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
  Alert,
} from "react-native";
import { useFormik } from "formik";
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
import { UserContext } from "../../context/UserContext";

export const SignUpScreen = () => {
  const phoneInput = useRef<PhoneInput>(null);
  const [formattedPhone, setFormattedPhone] = useState("");
  const navigation = useNavigation<NavigationProp<AppStackParams>>();
  const { createUser, checkIfUserExists } = useContext(UserContext);

  const toEditProfileScreen = useCallback(() => {
    navigation.navigate(AppRouteNames.EditProfileScreen);
  }, [navigation]);
  const toLogInScreen = useCallback(() => {
    navigation.navigate(AppRouteNames.LogInScreen);
  }, [navigation]);

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    validationSchema: ValidationSchema,
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      code: "",
      phone: "",
    },
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async ({ name, email, password }) => {
      if (await checkIfUserExists(email)) {
        Alert.alert(
          "User already exists!",
          "Please, log in or use another email."
        );
      } else {
        await createUser({ name, email, password, phone: formattedPhone });
        toEditProfileScreen();
      }
    },
  });

  const hasErrorEmail = touched.email && !!errors.email;
  const hasErrorPassword = touched.password && !!errors.password;
  const hasErrorConfirmPassword =
    touched.confirmPassword && !!errors.confirmPassword;
  const hasErrorName = touched.name && !!errors.name;
  const hasErrorCode = touched.code && !!errors.code;
  const hasErrorPhone = touched.phone && !!errors.phone;

  return (
    <ScrollView>
      <AppLayout title="Sign Up To woorkroom">
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          accessible={false}
        >
          <View style={signUpScreenStyles.inputsContainer}>
            <View style={signUpScreenStyles.phoneContainer}>
              <Text style={signUpScreenStyles.title}>Phone Number</Text>

              <PhoneInput
                ref={phoneInput}
                layout="second"
                textInputProps={{
                  value: values.phone,
                  maxLength: 12,
                  placeholder: "345-567-7890",
                }}
                defaultCode="US"
                onChangeText={(text) => {
                  setFieldValue("phone", formatPhoneNumber(text));
                }}
                onChangeFormattedText={(text) => {
                  setFormattedPhone(text);
                }}
                autoFocus={true}
                containerStyle={signUpScreenStyles.phoneInputContainer}
                textContainerStyle={[
                  signUpScreenStyles.textContainer,
                  hasErrorPhone
                    ? signUpScreenStyles.textContainerError
                    : signUpScreenStyles.textContainerStyle,
                ]}
                textInputStyle={signUpScreenStyles.textInputStyle}
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
                autoFocus: false,
              }}
              touchableOpacityStyle={
                hasErrorCode ? signUpScreenStyles.inputError : {}
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

        <BigBottomButton onPress={handleSubmit}>Next</BigBottomButton>
        <TextLinkButton leftDescription="Have Account?" onPress={toLogInScreen}>
          Log in
        </TextLinkButton>
      </AppLayout>
    </ScrollView>
  );
};
