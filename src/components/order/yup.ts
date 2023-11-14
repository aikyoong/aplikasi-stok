import * as yup from "yup";

// Definisikan skema validasi yang sesuai dengan StepOneData
export const stepOneSchema = yup.object().shape({
  company_name: yup.string().required("Company Name is required"),
  street1: yup.string().required("Street Address 1 is required"),
  street2: yup.string().required("Street Address 2 is required"),
  city: yup.string().required("City is required"),
  province: yup.string().required("Province is required"),
  postal_code: yup.string().required("Postal Code is required"),
});

// Gunakan skema ini dalam tipe StepOneData
export type YupStepOneData = yup.InferType<typeof stepOneSchema>;

export const stepTwoSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Need to be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters long")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least 1 uppercase letter and 1 number"
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  phone_number: yup
    .string()
    .matches(/^\+628[1-9][0-9]{8,11}$/, "Must use +62 format")
    .required("Phone is required"),
});
