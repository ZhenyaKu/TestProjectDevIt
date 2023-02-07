import { PropsWithChildren } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogoIcon } from "../Icons";
import { appLayoutStyles } from "./styles";

interface IProps {
	title?: string;
	withHeader?: boolean;
}

export const AppLayout = ({
	title,
	children,
	withHeader = true,
}: PropsWithChildren<IProps>) => {
	return (
		<SafeAreaView style={appLayoutStyles.container}>
			{withHeader && (
				<>
					<LogoIcon style={appLayoutStyles.logoIcon} />
					<Text style={appLayoutStyles.title}>{title}</Text>
				</>
			)}
			{children}
		</SafeAreaView>
	);
};
