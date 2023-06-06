import React, { memo, useEffect, useState } from "react";

//Types & Interfaces
import { Subject } from "../pages/Subjects/utils/interfaces";

//Mui Components
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  TableBody,
} from "@mui/material";

//Constant & Objects
import { AllSubjectColumn } from "../pages/Subjects/utils/objects";
import styled from "styled-components";
import { PlaceHolder } from "./style-components/StyleComponents";

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

const PlaceHolderItem = styled(PlaceHolder)`
  margin: auto;
`;

const PlaceHolderCount = [1, 2, 3, 4, 5];
const PlaceHolderRow = (
  <>
    {PlaceHolderCount.map(() => (
      <TableRow>
        {AllSubjectColumn.map(() => (
          <TableCell>
            <PlaceHolderItem />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);

const SubjectsTable = (arg: {
  data: Array<Subject>;
  isLoading: boolean;
}) => {
  const [tableBody, setTableBody] = useState<Array<React.JSX.Element>>([]);
  const columns = AllSubjectColumn;
  const { data, isLoading } = arg;

  
  //Generate the table if the data has change
  useEffect(() => {
    const elementArrayHolder: Array<React.JSX.Element> = []
    //TableBody Generator
    data?.forEach((subject) => {
      let subjectRowspan: number = 0;
      let teacherRowSpan: number = 0;
  
      //cell styling
      const rowHeaderStyle: React.CSSProperties = {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "1.15rem",
      };
      const style: React.CSSProperties = {
        textAlign: "center",
      };
  
      // get subject column row span
      subject.teachers.forEach((teacher) => {
        subjectRowspan += teacher.classes.length;
      });
  
      /**
       * Create the Element for the Subject Column
       * and the first Teacher and it's first correspond
       * class and schedule
       */
      const element = (
        <TableRow>
          <TableCell
            style={rowHeaderStyle}
            scope="row"
            rowSpan={subjectRowspan}
          >
            {subject.subject}
          </TableCell>
          <TableCell
            style={style}
            rowSpan={subject.teachers[0].classes.length}
          >
            {subject.teachers[0].teacher}
          </TableCell>
          <TableCell style={style}>
            {subject.teachers[0].classes[0].class}
          </TableCell>
          <TableCell style={style}>
            {subject.teachers[0].classes[0].schedule}
          </TableCell>
        </TableRow>
      );
      elementArrayHolder.push(element);
  
      /**
       * This would create the element for ff:
       *  *other class and schedule of first teacher
       *  *the element for the next teacher and it corresponding
       *    class and schedule
       *
       */
      subject.teachers.forEach((teacher, index) => {
        let classesElements: Array<any> = [];
        if (index === 0) {
          for (let i = 1; i < teacher.classes.length; i++) {
            let element = (
              // Element for other class and schedule of first teacher
              <>
                <TableRow>
                  <TableCell style={style}>
                    {teacher.classes[i].class}
                  </TableCell>
                  <TableCell style={style}>
                    {teacher.classes[i].schedule}
                  </TableCell>
                </TableRow>
              </>
            );
  
            elementArrayHolder.push(element);
          }
        } else {
          const numberOfClasses = teacher.classes.length;
          for (let i = 0; i < numberOfClasses; i++) {
            const element =
              i === 0 ? (
                // Element for other teachers first class and sched
                <TableRow>
                  <TableCell style={style} rowSpan={numberOfClasses}>
                    {teacher.teacher}
                  </TableCell>
                  <TableCell style={style}>
                    {teacher.classes[i].class}
                  </TableCell>
                  <TableCell style={style}>
                    {teacher.classes[i].schedule}
                  </TableCell>
                </TableRow>
              ) : (
                // Element for other teachers other class and sched
                <TableRow>
                  <TableCell style={style}>
                    {teacher.classes[i].class}
                  </TableCell>
                  <TableCell style={style}>
                    {teacher.classes[i].schedule}
                  </TableCell>
                </TableRow>
              );
  
              elementArrayHolder.push(element);
          }
        }
      });
    });
    setTableBody(elementArrayHolder)
  }, [data]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        border: "1px solid black",
        width: "100%",
        position: "relative",
        minHeight: "300px",
      }}
    >
      <Table size="medium">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
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
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? PlaceHolderRow : tableBody}
        </TableBody>
      </Table>
      <EmptyLabelContainer isVisible={data.length == 0 && !isLoading}>
        <EmptyLabel>No data to display</EmptyLabel>
      </EmptyLabelContainer>
    </TableContainer>
  );
};

export default memo(SubjectsTable);
