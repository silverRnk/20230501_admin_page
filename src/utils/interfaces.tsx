export interface FormValidationFeedback {
  message: string;
  isInvalid: boolean;
  isVisible: boolean;
}

export interface Grade {
  subject: string;
  q1?: number;
  q2?: number;
  q3?: number;
  q4?: number;
  final?: number;
  remarks?: string;
}

export interface GradesPerSY {
  year: number;
  grades: Array<Grade>;
}

export interface ColumnHeader {
  id: string;
  label: string;
  minWidth: number;
  align?: string | null;
  format?: () => any | null;
}

export interface ColumnHeaderShort {
  id: string;
  label: string;
}

export interface RowHeaderShort {
  id: string;
  label: string;
}

/**
 * Object for storing input value and validation state
 */
export interface FormInput {
  name: string;
  value: string | undefined;
  file?: FileList | undefined;
  isInvalid: boolean;
  feedbackMessage: string | undefined;
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