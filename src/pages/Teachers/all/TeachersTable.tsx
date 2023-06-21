import React, { memo } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  TableBody,
} from "@mui/material";
import { TeacherProfileShort } from "../utils/interface";
import { columnTeachers } from "../utils/ColumnLabels";
import { EmptyArrayGenerator } from "../../../utils/ArrayGenerator";
import { PlaceHolder } from "../../../compenents/style-components/StyleComponents";
import { relative } from "path";
import styled from "styled-components";
import { theme } from "../../../Theme";

const EmptyLabelContainer = styled.div<{ isVisible: boolean }>`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;
const EmptyLabel = styled.span`
  font-size: ${(props) => props.theme.fontSize.medium1};
`;

const TeachersTableLoadingFiller = () => {
  const column = columnTeachers;
  const array = EmptyArrayGenerator(5);
  return (
    <>
      {array.map(() => (
        <TableRow hover style={{cursor:"pointer"}}>
          {column.map(() => (
            <TableCell>
              <PlaceHolder style={{ height: "20px" }} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

const TeachersTable = (args: {
  data: Array<TeacherProfileShort>;
  isLoading: boolean;
  onSelectRow: (event, teacher: TeacherProfileShort) => void;
}) => {
  const column = columnTeachers;
  const { data, isLoading, onSelectRow } = args;

  return (
    <TableContainer
      component={Paper}
      sx={{
        border: "1px solid black",
        width: "100%",
        position: "relative",
        minHeight: "200px",
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
                }}
              >
                {col.label}
              </TableCell>
            );
          })}
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TeachersTableLoadingFiller />
          ) : (
            data.map((teacher) => (
              <TableRow
                className="table-body-row"
                hover
                onClick={(event) => {
                  onSelectRow(event, teacher);
                }}
                key={teacher.teacher_id}
                style={{ cursor: "pointer" }}
              >
                {column.map((col) => {
                  let value;
                  if (col.id === "teacher_dob") {
                    value = teacher[col.id];
                  } else {
                    value = teacher[col.id];
                  }

                  return (
                    <TableCell
                      size="medium"
                      style={{ fontSize: theme.fontSize.medium, textTransform:"capitalize" }}
                    >
                      {value || "N/A"}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <EmptyLabelContainer isVisible={data.length == 0 && !isLoading}>
        <EmptyLabel>No data to display</EmptyLabel>
      </EmptyLabelContainer>
    </TableContainer>
  );
};

export default memo(TeachersTable);
