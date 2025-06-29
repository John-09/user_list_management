import type { FormField } from "../Interface/ReusableFormInterface";

export const userFormFields: FormField[] = [
  {
    label: "First Name",
    name: "first_name",
    type: "input",
    placeholder: "Please enter first name",
    rules: [{ required: true, message: "First name is required" }],
  },
  {
    label: "Last Name",
    name: "last_name",
    type: "input",
    placeholder: "Please enter last name",
    rules: [{ required: true, message: "Last name is required" }],
  },
  {
    label: "Email",
    name: "email",
    type: "input",
    placeholder: "Please enter email",
    rules: [
      { required: true, message: "Email is required" },
      { type: "email", message: "Please enter a valid email" },
    ],
  },
  {
    label: "Profile Image Link",
    name: "avatar",
    type: "input",
    placeholder: "Please enter profile image link",
    rules: [{ required: true, message: "Profile image link is required" }],
  },
];

export const loginFields = [
  {
    label: "Email",
    name: "email",
    type: "input",
    inputType: "email", // 👈 native email input
    placeholder: "Enter your email",
    rules: [
      { required: true, message: "Please input your email!" },
      { type: "email", message: "Please enter a valid email!" },
    ],
  },
  {
    label: "Password",
    name: "password",
    type: "input",
    inputType: "password", // 👈 native password input
    placeholder: "Enter your password",
    rules: [{ required: true, message: "Please input your password!" }],
  },
  {
    label: "Remember me",
    name: "remember",
    type: "checkbox",
    valuePropName: "checked",
  },
];
