import React from "react";
import { StyleProp, View } from "react-native";
import { dividerStyles } from "./styles";

interface IProps {
	style?: StyleProp<any>;
}

export const Divider = ({ style }: IProps) => {
	return <View style={[dividerStyles.container, style]} />;
};
