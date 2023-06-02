import { ColumnHeaderShort } from "../../../utils/interfaces";
import { StudentProfileLong } from "./interface";

type Keys = keyof StudentProfileLong;

export const studentDetailsHeader: Array<ColumnHeaderShort> = [
  { id: "id_number", label: "Student Number" },
  { id: "name", label: "Name" },
  { id: "gender", label: "Gender" },
  { id: "religion", label: "Religion" },
  { id: "date_of_birth", label: "Date of Birth" },
  { id: "e_mail", label: "Email" },
  { id: "father_name", label: "Father's Name" },
  { id: "mother_name", label: "Mother's Name" },
  { id: "father_occupation", label: "Father's Occupation" },
  { id: "admission_date", label: "Admission Date" },
  { id: "class", label: "Grade" },
  { id: "section", label: "Section" },
];
