import { FormInputLabel } from "./interface";

type TeacherInputs =
  | "first_name"
  | "last_name"
  | "gender"
  | "dob"
  | "addr1"
  | "addr2"
  | "religion"
  | "email"
  | "phone"
  | "password"
  | "password_conf"
  | "profile_img"
  | "class"
  | "admission_date";

export const AddTeacherLabels: Record<TeacherInputs, FormInputLabel> =
  {
    first_name: {
      label: "First Name",
      name: "first_name",
      isRequired: true,
    },
    last_name: {
      label: "Last Name",
      name: "last_name",
      isRequired: true,
    },
    gender: { label: "Gender", name: "gender", isRequired: true },
    dob: {
      label: "Date of Birth",
      name: "date_of_birth",
      isRequired: true,
    },
    addr1: {
      label: "Address Line 1",
      name: "addr_line1",
      isRequired: true,
    },
    addr2: {
      label: "Address Line 2",
      name: "addr_line2",
      isRequired: false,
    },
    religion: {
      label: "Religion",
      name: "religion",
      isRequired: false,
    },
    email: { label: "Email", name: "email", isRequired: true },
    phone: { label: "Phone Number", name: "phone_no", isRequired: true },
    password: {
      label: "Password",
      name: "password",
      isRequired: true,
    },
    password_conf: {
      label: "Password Confirmation",
      name: "password_confirmation",
      isRequired: true,
    },
    profile_img: {
      label: "Profile Image",
      name: "profile_img",
      isRequired: false,
    },
    class: {
      label: "Advisory Class",
      name: "advisory_class",
      isRequired: false,
    },
    admission_date: {
      label: "Admission Date",
      name: "admission_date",
      isRequired: true,
    },
  };
