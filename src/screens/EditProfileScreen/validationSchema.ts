import * as Yup from "yup";

const emailRegex = /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,64}$/;

export const ValidationSchema = Yup.object().shape({
	name: Yup.string().required("Name is required"),
	email: Yup.string()
		.required("Email is required")
		.matches(emailRegex, "Please enter a valid email address"),
	phone: Yup.string().required("Phone number is required"),
	position: Yup.string(),
	skype: Yup.string(),
});
