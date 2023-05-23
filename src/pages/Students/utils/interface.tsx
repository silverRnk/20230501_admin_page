import { Gender, StudentStatus } from "../../../utils/Types";

export interface StudentProfileShort {
  std_id: string;
  std_name: string;
  std_gender: string;
  std_grade: string;
  std_section: string;
  std_status: string;
  std_date_of_birth: string;
  parents_phone: string;
}

export interface StudentProfileLong {
  id_number: number;
  name: string;
  gender: Gender;
  father_name: string;
  mother_name: string;
  date_of_birth: string;
  religion: string;
  father_occupation: string;
  e_mail: string;
  admission_date: Date;
  class: string;
  section: string;
  status: StudentStatus;
}

export interface ColumnHeader {
  id: string;
  label: string;
  minWidth: number;
  align?: string | null;
  format?: () => any | null;
}

export interface CredentialsRow {
  file_type: string;
  file_name: string | null;
  upload_date: string | null;
}

export interface CredentialsData {
  birth_cert: string | null;
  form_137: string | null;
  good_moral: string | null;
  form_138: string | null;
  report_card: string | null;
}

export interface AddStudentProps {
  isInvalid?: boolean;
  isVisible?: boolean;
}

export interface FormValidationFeedback {
  message: string;
  isInvalid: boolean;
  isVisible: boolean;
}

export interface FormInputLabel {
  name: string;
  label: string;
}

export interface GradeLevels {
  grade_level_id: string;
  level: number;
  grade_level: string;
  sections: Section[];
}

export interface Section {
  id: number;
  section_name: string;
}
