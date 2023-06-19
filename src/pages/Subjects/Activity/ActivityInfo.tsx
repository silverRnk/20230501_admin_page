import React from "react";
import styled from "styled-components";
import { RowHeaderShort } from "../../../utils/interfaces";
import { type } from "os";
import { PlaceHolder } from "../../../compenents/style-components/StyleComponents";

const Info = styled.div`
  width: 100%;
`;
const InfoGroup = styled.div``;
const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
`;
const RowHeader = styled.span`
  font-weight: bold;
  font-size: 1rem;
`;
const Cell = styled.span`
  font-size: 1rem;
`;

const TextLoadingPlaceholder = styled(PlaceHolder)`
  height: unset;
  height: 1rem;
`;

export interface ActivityInformation {
  title: string;
  subject: string;
  grade: string;
  section: string;
  dateOfSubmission: Date | string;
  teacher: string;
}

type ActivityInfoState = "Loading" | "Show";

const rowHeaders: RowHeaderShort[] = [
  { id: "subject", label: "Subject" },
  { id: "grade", label: "Grade" },
  { id: "section", label: "Section" },
  { id: "dateOfSubmission", label: "Date of Submission" },
  { id: "teacher", label: "Teacher" },
];

const ActivityInfo = (props: {
  info?: ActivityInformation | null;
  state: ActivityInfoState;
}) => {
  const { info, state } = props;
  return (
    <Info role="table" aria-label="Activity Information">
      <InfoGroup role="rowgroup">
        {rowHeaders.map((rowHeader) => {
          return (
            <Row role="rowgroup">
              <RowHeader role="rowheader">
                {rowHeader.label}:
              </RowHeader>
              <Cell role="cell">
                {state === "Loading" ? (
                  <TextLoadingPlaceholder />
                ) : rowHeader.id === "dateOfSubmission" ? (
                  info[rowHeader.id].toLocaleString()
                ) : (
                  info[rowHeader.id]
                )}
              </Cell>
            </Row>
          );
        })}
      </InfoGroup>
    </Info>
  );
};

export default ActivityInfo;
