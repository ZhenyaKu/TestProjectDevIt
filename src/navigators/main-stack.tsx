import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { EditProfileScreen } from "../screens/EditProfileScreen";
import { LoginScreen } from "../screens/LogInScreen";
import { SignUpScreen } from "../screens/SignUpScreen";

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  const { currentUser } = useContext(UserContext);
  const initialRouteName = currentUser ? "EditProfileScreen" : "LogInScreen";

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name="LogInScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};
