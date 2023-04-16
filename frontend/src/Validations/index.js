import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  email: yup.string().required("Required field"),
  password: yup.string().required("Required field")
})