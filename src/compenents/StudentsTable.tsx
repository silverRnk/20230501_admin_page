import React, {memo} from "react";
import { StudentProfileShort } from "../pages/Students/utils/interface";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  TableBody,
  TablePagination,
  Pagination,
} from "@mui/material";
import { columnAllStudents } from "../pages/Students/utils/ColumnLabels";
import { EmptyArrayGenerator } from "../utils/ArrayGenerator";
import { PlaceHolder } from "./style-components/StyleComponents";
import { theme } from "../Theme";


const RowBodyStyle: React.CSSProperties = {
  cursor: "pointer" ,
}

const LoadingRows = (
  <>
    {EmptyArrayGenerator(5).map(() => (
      <TableRow className="table-body-row" hover style={RowBodyStyle}>
        {columnAllStudents.map(() => (
          <TableCell >
            <PlaceHolder style={{height: "20px"}} />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);

const StudentsTable = (args: {
  data: Array<StudentProfileShort>;
  onSelectRow: (event, student: StudentProfileShort) => void;
  isLoading: boolean;
}) => {
  const column = columnAllStudents;
  const { data, isLoading, onSelectRow } = args;

  return (
    <TableContainer
      component={Paper}
      sx={{
        border: "1px solid black",
        width: "100%",
      }}
    >
      <Table size="medium">
        <TableHead>
          {column.map((col) => {
            return (
              <TableCell
                key={col.id}
                style={{
                  minWidth: col.minWidth,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.05rem",
                }}
              >
                {col.label}
              </TableCell>
            );
          })}
        </TableHead>
        <TableBody>
          {isLoading
            ? (LoadingRows)
            : data.map((student) => (
                <TableRow
                  className="table-body-row"
                  hover
                  onClick={(event) => {
                    onSelectRow(event, student);
                  }}
                  key={student.std_id}
                  style={RowBodyStyle}
                >
                  {column.map((col) => {
                    let value;
                    if (col.id === "std_date_of_birth") {
                      value = student[col.id];
                    } else {
                      value = student[col.id];
                    }

                    return (
                      <TableCell
                        size="medium"
                        style={{
                          textAlign: col.align || "left",
                          textTransform: "capitalize",
                          fontSize: theme.fontSize.medium
                        }}
                      >
                        {value || "N/A"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(StudentsTable);
