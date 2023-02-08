import * as Yup from "yup";

const emailRegex = /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,64}$/;
const phoneRegExp =
	/^ (\+\d{ 1, 2 } \s)?\(?\d{ 3 } \)?[\s.-]\d{ 3 } [\s.-]\d{ 4 } $/;

export const ValidationSchema = Yup.object().shape({
	name: Yup.string()
		.matches(/^[A-Z][a-z0-9_-]{1,30} [A-Z][a-z0-9_-]{1,30}$/)
		.required("Name is required"),
	email: Yup.string()
		.required("Email is required")
		.matches(emailRegex, "Please enter a valid email address"),
	phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
	position: Yup.string(),
	skype: Yup.string(),
});
