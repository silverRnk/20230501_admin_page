import { ColumnHeaderShort, RowHeaderShort } from "../../../utils/interfaces";
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

export const credentialsRowHeader: Array<RowHeaderShort> = [
  {id: "birth_cert", label: "Birth Certificate"},
  {id: "form_137", label: "Form 137"},
  {id: "good_moral", label: "Good Moral"},
  {id: "form_138", label: "Form 138"},
  {id: "report_card", label: "Report Card"}
]
