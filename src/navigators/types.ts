export enum AppRouteNames {
	LogInScreen = "LogInScreen",
	EditProfileScreen = "EditProfileScreen",
	SignUpScreen = "SignUpScreen",
}

export type AppStackParams = {
	navigate(LogInScreen: AppRouteNames): void;
	[AppRouteNames.LogInScreen]: undefined;
	[AppRouteNames.EditProfileScreen]: undefined;
	[AppRouteNames.SignUpScreen]: undefined;
};
