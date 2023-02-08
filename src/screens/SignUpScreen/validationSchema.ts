import * as Yup from "yup";

const emailRegex = /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,64}$/;

export const ValidationSchema = Yup.object().shape({
	name: Yup.string()
		.matches(
			/^[A-Z][a-z0-9_-]{1,30} [A-Z][a-z0-9_-]{1,30}$/,
			"Please enter your name"
		)
		.required("Name is required"),
	email: Yup.string()
		.required("Email is required")
		.matches(emailRegex, "Please enter a valid email address"),
	password: Yup.string()
		.min(6, "Password should be of minimum 6 characters length")
		.required("Password is required"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password")], "Passwords must match")
		.required("Password is required"),
	code: Yup.number().required().min(4),
});
