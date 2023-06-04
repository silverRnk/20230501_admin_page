import React from "react";
import styled from "styled-components";
import { TeacherProfileLong } from "../pages/Teachers/utils/interface";
import { teacherProfileDetailsRowHeaders } from "../pages/Teachers/utils/objects";
import { PlaceHolder } from "./style-components/StyleComponents";

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
  font-size: 1.25rem;
  padding-left: 10px;
`;

const TextPlaceHolder = styled(PlaceHolder)`
  width: 200px !important;

`

const TeacherProfileDetails = (arg: {
  data: TeacherProfileLong | null;
  isLoading: boolean
}) => {
  const { data, isLoading } = arg;
  return (
    <Table role="table">
      <TableBody role="rowgroup">
        {teacherProfileDetailsRowHeaders.map((row) => (
          <Row role="row">
            <RowHeader role="rowheader">{row.label}:</RowHeader>
            {isLoading? (<Cell><TextPlaceHolder/></Cell>):<Cell>{data?.[row.id] || "N/A" }</Cell>}
          </Row>
        ))}
      </TableBody>
    </Table>
  );
};

export default TeacherProfileDetails;

{
  /* <RowHeader role="rowheader">{row.label}:</RowHeader>
            {isLoading ? (
              <Cell>
                <PlaceHolder />
              </Cell>
            ) : (
              <Cell>{!data ? "N/A" : data[row.id]}</Cell>
            )} */
}
