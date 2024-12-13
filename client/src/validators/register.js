import * as yup from "yup";

export const registerValidatorSchema = yup.object({
  name: yup.string().min(2).required("Please enter your name!"),
  email: yup
    .string()
    .email("Please provide a valid email")
    .required("Please enter your email!"),
  password: yup
    .string()
    .min(6, "Password length must be of atleast 6 characters!").required("Please enter your password!"),
  confirmPswd: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match!")
    .required("Please enter your password again!"),
    dob: yup
    .string()
    .required("Please provide your date of birth!")
    .test("dateValidation", "Please provide a valid date of birth", (value) => {
      if (!value) return false; // Check if the value exists
      const inputDate = new Date(value); // Parse the date string
      const currentDate = new Date(); // Current date
      return inputDate <= currentDate; // Ensure the date is not in the future
    }),
});
