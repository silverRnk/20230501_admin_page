import React from "react";
import styled from "styled-components";
import { StudentProfileLong } from "../utils/interface";
import { studentDetailsHeader } from "../utils/objects";
import { PlaceHolder } from "../../../compenents/style-components/StyleComponents";

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
                <PlaceHolder style={{height: "20px"}} />
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
