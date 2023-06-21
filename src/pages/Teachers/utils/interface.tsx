import { Gender, StudentStatus } from "../../../utils/Types";

export interface TeacherProfileShort {
  teacher_id: string,
  teacher_name: string,
  teacher_gender: Gender,
  teacher_advisory_class: string,
  teacher_address: string,
  teacher_dob: string,
  teacher_phone: string
} 

export interface TeacherProfileLong {
  teacher_id: string,
  teacher_name: string
  teacher_gender: Gender,
  teacher_date_of_birth: string | Date,
  teacher_address: string,
  teacher_religion: string,
  teacher_email: string,
  teacher_phone: string,
  teacher_advisory_class: string,
  teacher_admission_date: string
  teacher_profile_img: string
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
  isRequired: boolean;
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

export type AllTeachersSearchParams = "page" | "name" | "gradeLevel" | "section" 
