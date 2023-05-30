import { ColumnHeader, FormInputLabel } from "./interface";

export const credentialsColumn: Array<ColumnHeader> = [
  {
    id: "type",
    label: "Upload Type",
    minWidth: 50,
    align: null,
    format: () => null,
  },
  {
    id: "upload",
    label: "",
    minWidth: 75,
    align: null,
    format: () => null,
  },
  {
    id: "file_name",
    label: "File Name",
    minWidth: 75,
    align: null,
    format: () => null,
  },
  {
    id: "date",
    label: "Upload Date",
    minWidth: 75,
    align: null,
    format: () => null,
  },
  {
    id: "download",
    label: "",
    minWidth: 25,
    align: "center",
  },
];

export const columnTeachers: Array<ColumnHeader> = [
  { id: "teacher_id", label: "Teacher Number", minWidth: 70, align: "center" },
  { id: "teacher_name", label: "Name", minWidth: 70 },
  {
    id: "teacher_gender",
    label: "Gender",
    minWidth: 70,
    align: "center",
  },
  { id: "teacher_class", label: "Class", minWidth: 70 },
  { id: "teacher_addr", label: "Address", minWidth: 70 },
  { id: "teacher_admission_date", label: "Admission Date", minWidth: 70 },
  { id: "teacher_phone", label: "Phone", minWidth: 70 },
];


export const AddStudentsLabel: Array<FormInputLabel> = [
  {name: "first_name", label: "First Name", isRequired: true},
  {name: "last_name", label: "Last Name", isRequired: true},
  {name: "address_line_1", label: "Address Line 1", isRequired: true},
  {name: "address_line_2", label: "Address Line 2", isRequired: false},
  {name: "gender", label: "Gender", isRequired: true},
  {name: "date_of_bird", label: "Date of Birth", isRequired: true},
  {name: "email", label: "Email", isRequired: true},
  {name: "phone", label: "Phone Number", isRequired: true},
  {name: "profile_img", label: "Profile Image", isRequired: false}
]
