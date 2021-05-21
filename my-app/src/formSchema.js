import * as yup from "yup";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(3, "Name Must be at least 3 characters long"),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("A valid password is required")
    .min(7, "password must be at least 7 characters long"),
  terms: yup.boolean(),
});

export default formSchema;
