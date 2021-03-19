import * as yup from 'yup'

export const formSchema = yup.object().shape({
    name: yup
    .string()
    .required('A Username is required.')
    .min(3, "Username should be at least 3 characters long."),
    email: yup
    .string()
    .required('An email is required.')
    .email("A valid email is required"),
    terms: yup 
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
    password: yup
    .string()
    .required('A Password is Required here.')
    .min(5, "A users password should be at least 5 characters long.")
});