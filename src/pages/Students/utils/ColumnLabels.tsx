import { ColumnHeader } from "./interface";

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
    align: "center"
  }
];

export const columnAllStudents: Array<ColumnHeader> = [
  { id: "std_id", label: "Student ID", minWidth: 70 },
  { id: "std_name", label: "Name", minWidth: 70},
  { id: "std_gender", label: "Gender", minWidth: 70},
  { id: "std_grade", label: "Class", minWidth: 70},
  { id: "std_section", label: "Section", minWidth: 70},
  { id: "std_status", label: "Status", minWidth: 70},
  { id: "std_date_of_birth", label: "Date of Birth", minWidth: 70},
  { id: "parents_phone", label: "Parent's Phone No.", minWidth: 70}

];
