import { CSSProperties } from "react";
import { Gender, StudentStatus } from "../../../utils/Types";
import { credentialsRowHeader } from "./objects";

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
  admission_date: string;
  class: string;
  section: string;
  status: StudentStatus;
  profile_img: string
}

// const textAlignments = ['auto', 'left', 'right', 'center', 'justify'] as const;

type textAlignments = "left" | "right" | "center" | "justify";

export interface ColumnHeader {
  id: string;
  label: string;
  minWidth: number;
  align?: textAlignments | null;
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

/**
 * 
 */
export interface GradeLevels {
  grade_level_id: string;
  level: number;
  grade_level: string;
  sections: Section[];
}

export interface Section {
  id: number;
  name: string;
}

export interface CredentialsInfo {
  id: string;
  fileName: string;
  uploadedDate: string;
  downloadLink: string;
}

export type CredentialsRowHeader =
  | "birth_cert"
  | "form_137"
  | "good_moral"
  | "form_138"
  | "report_card";

