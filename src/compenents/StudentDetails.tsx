import React from "react";
import styled from "styled-components";
import { StudentProfileLong } from "../pages/Students/utils/interface";
import { studentDetailsHeader } from "../pages/Students/utils/objects";

const Table = styled.div`
  width: 100%;
`;
const TableBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const RowHeader = styled.span`
  flex: 1;
  font-size: 1.25rem;
  padding-left: 10px;
  font-weight: bold;
`;
const Cell = styled.span`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 10px;
`;

const PlaceHolder = styled.span`
  height: 20px;
  width: 200px;
  background: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
`;

const StudentDetails = (arg: {
  data?: StudentProfileLong | null;
  isLoading: boolean;
}) => {
  const { data, isLoading } = arg;

  return (
    <Table role="table">
      <TableBody role="rowgroup">
        {studentDetailsHeader.map((row) => (
          <Row role="row">
            <RowHeader role="rowheader">{row.label}:</RowHeader>
            {isLoading ? (
              <Cell>
                <PlaceHolder />
              </Cell>
            ) : (
              <Cell>{!data ? "N/A" : data[row.id]}</Cell>
            )}
          </Row>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentDetails;
