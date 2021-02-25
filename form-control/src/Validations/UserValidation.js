import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().trim().required("Please enter your name").min(4),
  email: yup
    .string()
    .email("Not a valid email")
    .required("Email Field is required"),
  favDog: yup.string(),
  password: yup.string().min(4).required("pw is req"),
  tos: yup.boolean().oneOf([true], "You must agree to ToS to continue"),
  likesCheese: yup.string(),
});
