import * as Yup from "yup";

const emailRegex = /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,64}$/;
// const phoneRegexp =
// 	/^ (\+\d{ 1, 2 } \s)?\(?\d{ 3 } \)?[\s.-]\d{ 3 } [\s.-]\d{ 4 } $/;

export const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .matches(emailRegex, "Please enter a valid email address"),
  password: Yup.string()
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password is required"),
  phone: Yup.string().min(12).max(12).required("Phone number is required"),
  code: Yup.number()
    .required()
    .test(
      "len",
      "Must be exactly 4 digits",
      (val) => String(val)?.length === 4
    ),
});
