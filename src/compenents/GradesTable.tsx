import React from "react";
import {
  ColumnHeader as ColumnHeadType,
  Grade,
} from "../utils/interfaces";
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
`;
const Row = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr repeat(5, 0.5fr) 2fr;
  align-items: center;
  border-bottom: 1px solid lightgray;
`;
const RowHeaders = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;
const ColumnHeader = styled.span`
  text-align: center;
  ${props => props.theme.fontThemes.h5}
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

const RemarksCell = styled.span``;

const Placeholder = styled.span`
  height: 30px;
  width: 70%;
  background: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 104px;
  display: inline-block;
  position: relative;

  -webkit-animation-duration: 1s;
  -webkit-animation-fill-mode: forwards;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: placeholderShimmer;
  -webkit-animation-timing-function: linear;
`;

const column: Array<ColumnHeadType> = [
  { id: "subject", label: "", align: "left", minWidth: 70 },
  { id: "q1", label: "1", align: "left", minWidth: 70 },
  { id: "q2", label: "2", align: "left", minWidth: 70 },
  { id: "q3", label: "3", align: "left", minWidth: 70 },
  { id: "q4", label: "4", align: "left", minWidth: 70 },
  { id: "remarks", label: "Remarks", align: "center", minWidth: 100 },
];

const GradesTable = (gradeInfo: {
  grades: Array<Grade>;
  ave?: number;
  isEmpty: boolean;
}) => {
  const { grades, ave, isEmpty } = gradeInfo;
  const numberOfPlaceHolderRow = [1, 2, 3];

  return (
    <Table>
      <RowHeaders role="rowgroup">
        <Row role="row">
          <ColumnHeader></ColumnHeader>
          <ColumnHeader role="columnheader">1</ColumnHeader>
          <ColumnHeader role="columnheader">2</ColumnHeader>
          <ColumnHeader role="columnheader">3</ColumnHeader>
          <ColumnHeader role="columnheader">4</ColumnHeader>
          <ColumnHeader role="columnheader">Final</ColumnHeader>
          <ColumnHeader role="columnheader">Remarks</ColumnHeader>
        </Row>
      </RowHeaders>
      <RowGroup role="rowgroup">
        {isEmpty
          ? numberOfPlaceHolderRow.map(() => (
              <Row role="row">
                <Cell role="cell">
                  <Placeholder />
                </Cell>
                <Cell role="cell">
                  <Placeholder />
                </Cell>
                <Cell role="cell">
                  <Placeholder />
                </Cell>
                <Cell role="cell">
                  <Placeholder />
                </Cell>
                <Cell role="cell">
                  <Placeholder />
                </Cell>
                <Cell role="cell">
                  <Placeholder />
                </Cell>
                <Cell role="cell">
                  <Placeholder />
                </Cell>
              </Row>
            ))
          : grades.map((grade) => (
              <Row role="row">
                <Cell role="rowheader">{grade.subject}</Cell>
                <Cell role="cell">{grade.q1 ?? ""}</Cell>
                <Cell role="cell">{grade.q2 ?? ""}</Cell>
                <Cell role="cell">{grade.q3 ?? ""}</Cell>
                <Cell role="cell">{grade.q4 ?? ""}</Cell>
                <Cell role="cell">{grade.final ?? ""}</Cell>
                <RemarksCell role="cell">
                  {grade.remarks ?? ""}
                </RemarksCell>
              </Row>
            ))}
      </RowGroup>
      <RowGroup role="rowgroup">
        {isEmpty ? (
          <Row role="row">
            <Cell style={{ gridColumn: "5/6", textAlign: "end" }}>
              Ave:
            </Cell>
            <Cell style={{ gridColumn: "6/7" }}>
              <Placeholder />
            </Cell>
          </Row>
        ) : (
          <Row role="row">
            <Cell style={{ gridColumn: "5/6", textAlign: "end" }}>
              Ave:
            </Cell>
            <Cell style={{ gridColumn: "6/7" }}>
              {typeof ave === "number" ? ave : ""}
            </Cell>
          </Row>
        )}
      </RowGroup>
    </Table>
  );
};

export default GradesTable;
