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
    align: "center",
  },
];

export const columnTeachers: Array<ColumnHeader> = [
  { id: "teacher_id", label: "Id", minWidth: 70, align: "center" },
  { id: "teacher_name", label: "Name", minWidth: 70 },
  {
    id: "teacher_gender",
    label: "Gender",
    minWidth: 70,
    align: "center",
  },
  { id: "teacher_class", label: "Class", minWidth: 70 },
  { id: "teacher_addr", label: "Address", minWidth: 70 },
  { id: "teacher_dob", label: "Date of Birth", minWidth: 70 },
  { id: "teacher_phone", label: "Phone", minWidth: 70 },
];
