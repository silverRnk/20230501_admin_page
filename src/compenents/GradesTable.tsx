import React from "react";
import { Grade } from "../utils/interfaces";
import styled from "styled-components";

const TableTitle = styled.div`
  width: 100%;
  height: 1.5rem;
  font-weight: bolder;
  font-size: 1.5rem;
  text-align: center;
  line-height: 1.5rem;
  margin-top: 5px;
`;

const Table = styled.div`
  display: flex;
  width: max(100%, 300px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  z-index: 10;
`;
const RowGroup = styled.div`
  width: 100%;

  & > :nth-child(even) {
    background-color: lightblue;
  }
`;
const Row = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 0.5fr 0.5fr 0.5fr 0.5fr 1fr;
  border-bottom: 1px solid lightgray;
`;
const RowHeaders = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  box-shadow: 0px 1px 1px gray;
`;
const ColumnHeader = styled.span`
  text-align: center;
  font-weight: 700;
  line-height: 35px;
  font-size: 1.25rem;
  height: 35px;
`;
const Cell = styled.span`
  font-weight: ${(props) =>
    props.role === "rowheader" ? "bold" : 400};
  text-align: ${(props) =>
    props.role === "rowheader" ? "start" : "center"};
  font-size: 1.1rem;
  padding: 15px
    ${(props) => (props.role === "rowheader" ? "15px" : "0px")};
`;

const GradesTable = (gradeInfo: {
  grades: Array<Grade>;
  year: number;
  ave?: number;
}) => {
  const { grades, year, ave } = gradeInfo;

  return (
    <Table>
      <RowHeaders role="rowgroup">
        <TableTitle role="heading">
          S.Y. {`${year}-${year + 1}`}
        </TableTitle>
        <Row role="row">
          <ColumnHeader></ColumnHeader>
          <ColumnHeader role="columnheader">1</ColumnHeader>
          <ColumnHeader role="columnheader">2</ColumnHeader>
          <ColumnHeader role="columnheader">3</ColumnHeader>
          <ColumnHeader role="columnheader">4</ColumnHeader>
          <ColumnHeader role="columnheader">Final</ColumnHeader>
        </Row>
      </RowHeaders>
      <RowGroup role="rowgroup">
        {grades.map((grade) => (
          <Row role="row">
            <Cell role="rowheader">{grade.subject}</Cell>
            <Cell role="cell">{grade.q1 ?? ""}</Cell>
            <Cell role="cell">{grade.q2 ?? ""}</Cell>
            <Cell role="cell">{grade.q3 ?? ""}</Cell>
            <Cell role="cell">{grade.q4 ?? ""}</Cell>
          </Row>
        ))}
      </RowGroup>
      <RowGroup role="rowgroup">
        <Row role="row">
          <Cell style={{ gridColumn: "5/6", textAlign: "end" }}>
            Ave:
          </Cell>
          <Cell>{typeof ave === 'number' ? ave: ''}</Cell>
        </Row>
      </RowGroup>
    </Table>
  );
};

export default GradesTable;
