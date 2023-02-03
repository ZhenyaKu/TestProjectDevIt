import * as Yup from "yup";

const emailRegex = /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,64}$/;

export const ValidationSchema = Yup.object().shape({
	email: Yup.string()
		.required("Email is required")
		.matches(emailRegex, "Please enter a valid email address"),
	password: Yup.string()
		.min(6, "Password should be of minimum 6 characters length")
		.required("Password is required"),
});
