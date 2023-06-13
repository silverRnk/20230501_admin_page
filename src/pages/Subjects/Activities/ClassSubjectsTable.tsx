import React from "react";
import styled, { css } from "styled-components";
import {
  EmptyLabel,
  EmptyLabelContainer,
  PlaceHolder,
} from "../../../compenents/style-components/StyleComponents";
import { EmptyArrayGenerator } from "../../../utils/ArrayGenerator";
import SubjectsChip from "../../../compenents/SubjectsChip";


const TableContainer = styled.div`
  background-color: #fff;
  max-height: 300px;
  color: rgba(0, 0, 0, 0.87);
  -webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)
    0ms;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  /* box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 1px 3px 0px rgba(0, 0, 0, 0.12); */
  width: 100%;
  overflow-x: auto;
  /* border: 1px solid black; */
  width: 100%;
  position: relative;
  min-height: 300px;
`;

const ColumnWidths = css`
  display: grid;
  grid-template-columns: 200px 1fr;
`;

const Table = styled.div`
  width: 100%;
`;

const RowGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TableHeader = styled.div`
  width: inherit;
  ${ColumnWidths}
`;

const ColumnHeader = styled.span`
  text-align: center;
  line-height: 1.5rem;
  letter-spacing: 0.01071em;
  display: table-cell;
  vertical-align: inherit;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  padding: 16px;
`;

const Row = styled.div`
  width: inherit;
  ${ColumnWidths}
`;

const RowHeader = styled.span`
  max-width: 200px;
  word-wrap: break-word;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.15rem;
  vertical-align: inherit;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  padding: 16px;
  color: rgba(0, 0, 0, 0.87);
`;

const Cell = styled.span`
  max-height: 85px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 5px;
  gap: 10px;
  align-content: flex-start;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
`;

const CellPlaceHolder = styled(PlaceHolder)`
  height: unset;
  height: 20px;
`;

/**
 * Represent the data for Activities Table
 * @property  className - name of the class
 * @property  subjects - list of SubjectActivities represent each subject and their corresponding activities
 */
export interface ClassSubjectsActivities {
  className: string;
  subjects: Array<SubjectActivities>;
}

export interface ClassSubjects {
  className: string;
  subjects: Array<SubjectShort>;
}

export interface SubjectShort {
  id: string;
  name: string;
}

/**
 * @property {string} name - name of subject
 * @property {Array of Activities} activities - list of activities
 */
export interface SubjectActivities {
  name: string;
  activities: Array<Activities>;
}

/**
 * Activities of the curresponding subject
 * @property {string} id
 * @property {string} name -
 * @property {string | Date} dateOfSubmission
 * @property {string} description
 * @property {Array of {type: ActivityResourceType, url: string}} activityResource - Array of resources url link
 */
export interface Activities {
  id: string;
  name: string;
  dateOfSubmission: string | Date;
  description: string;
  activityResources: Array<{
    type: ActivityResourceType;
    url: string;
  }>;
}

type ActivityResourceType = "Link" | "Files";

const emptyPlaceHolderItems = EmptyArrayGenerator(5);

const ClassSubjectsTable = (props: {
  classSubjects: Array<ClassSubjects>;
  schoolYear: number;
  isLoading: boolean;
}) => {
  const { classSubjects, schoolYear, isLoading } = props;
  return (
    <TableContainer>
      <Table
        role="table"
        aria-label={`Subjects per class for S.Y. ${schoolYear}`}
      >
        <RowGroup role="rowgroup">
          <TableHeader role="row">
            <ColumnHeader
              className="MuiTableCell-head"
              role="columnheader"
            >
              Class
            </ColumnHeader>
            <ColumnHeader
              className="MuiTableCell-head"
              role="columnheader"
            >
              Subjects
            </ColumnHeader>
          </TableHeader>
        </RowGroup>

        <RowGroup role="rowgroup">
          {isLoading
            ? emptyPlaceHolderItems.map(() => (
                <Row>
                  <RowHeader role="rowheader">
                    <CellPlaceHolder />
                  </RowHeader>
                  <Cell role="cell">
                    <CellPlaceHolder
                      style={{ width: "100px", height: "30px" }}
                    />
                    <CellPlaceHolder
                      style={{ width: "100px", height: "30px" }}
                    />
                    <CellPlaceHolder
                      style={{ width: "100px", height: "30px" }}
                    />
                  </Cell>
                </Row>
              ))
            : classSubjects.map((classSubject) => {
                return (
                  <Row>
                    <RowHeader role="rowheader">
                      {classSubject.className}
                    </RowHeader>
                    <Cell>
                      {classSubject.subjects.map((subject, index) => (
                        <SubjectsChip
                          name={subject.name}
                          type={
                            (index + 1) % 3 === 1
                              ? "BLUE"
                              : (index + 1) % 3 === 2
                              ? "YELLOW"
                              : "RED"
                          }
                        />
                      ))}
                    </Cell>
                  </Row>
                );
              })}
        </RowGroup>
      </Table>
      <EmptyLabelContainer
        isVisible={classSubjects.length === 0 && !isLoading}
      >
        <EmptyLabel>No data to display</EmptyLabel>
      </EmptyLabelContainer>
    </TableContainer>
  );
};

export default ClassSubjectsTable;
