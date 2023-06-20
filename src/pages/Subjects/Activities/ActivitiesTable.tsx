import React, { useState } from "react";

//MUI Imports
//MUI Table components
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  TableBody,
} from "@mui/material";

//MUI Materials-Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { ColumnHeader } from "../../../utils/interfaces";
import styled from "styled-components";
import { Activities } from "./ClassSubjectsTable";
import { theme } from "../../../Theme";
import { Link, useNavigate } from "react-router-dom";
import ResourceLink from "../../../compenents/ui/ResourceLink";

const headers: Array<ColumnHeader> = [
  { id: "title", label: "Title", minWidth: 100 },
  {
    id: "submissionDate",
    label: "Date of Submission",
    minWidth: 100,
  },
  { id: "resources", label: "Resources", minWidth: 100 },
];

//Styled-components
const Container = styled.div`
  position: relative;
  min-height: 300px;
`;

const PopupOptions = styled.div<{ isDisplayed: boolean }>`
  display: ${(props) => (props.isDisplayed ? "grid" : "none")};
  grid-template-rows: 1fr 1fr;
  position: absolute;
  height: auto;
  min-height: 50px;
  width: 100px;
  bottom: 50%;
  right: 30px;
  border-radius: 5px;
  box-shadow: 0 0 5px 2px lightgray;
  background-color: white;
`;

const MoreOptionsLinks = styled.a`
  align-self: center;
  width: 100%;
  text-decoration: none;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  text-align: center;

  &:hover {
    background-color: #fffde5;
    filter: brightness(80%);
  }
`;

const CheckBox = styled.input`
  height: 20px;
  width: 20px;
`;

const Button = styled.button`
  all: unset;
  width: 23px;
  height: 23px;
  display: flex;

  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: transparent;
  position: relative;
  transition: all 0.5s ease;

  &:active {
    background: lightgray;
  }
`;

const ColGroup = styled.colgroup``;
const Col = styled.col``;

const TableOptionsContainer = styled.div`
  width: 100%;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export type ButtonType = "ADD" | "DELETE";

const TableOptionsButtons = styled.button<{ buttonType: ButtonType }>`
  all: unset;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  color: ${(props) =>
    props.buttonType === "ADD"
      ? props.theme.colors.primary
      : props.theme.colors.red};

  &:hover {
    background-color: ${(props) => props.theme.colors.background2};
  }

  &:active {
    filter: brightness(80%);
  }
`;

const LabelContainer = styled.div<{ isDisplayed: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.isDisplayed ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;

const Label = styled.span`
  font-size: 1rem;
`;

//Styled-components End



const ActivitiesTableHead = (props: {
  numSelected: number;
  rowCount: number;
  onSelectAllClick: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}) => {
  const { onSelectAllClick, numSelected, rowCount } = props;
  return (
    <>
      <TableHead>
        <TableCell>
          <CheckBox
            type="checkbox"
            checked={
              (numSelected === rowCount && rowCount > 0) || undefined
            }
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headers.map((head) => (
          <TableCell key={head.id} style={{ textAlign: "center" }}>
            {head.label}
          </TableCell>
        ))}
        <TableCell></TableCell>
      </TableHead>
    </>
  );
};



const TableOptions = (props: { selectedRows: readonly string[] }) => {
  const { selectedRows } = props;
  const navigate = useNavigate()

  const handleAdd = () => {
    navigate('/subjects/activity/add')
  };

  const handleDelete = () => {};

  return (
    <TableOptionsContainer>
      <TableOptionsButtons onClick={handleAdd} buttonType="ADD">
        <AddIcon />
      </TableOptionsButtons>
      <TableOptionsButtons buttonType="DELETE">
        <DeleteIcon />
      </TableOptionsButtons>
    </TableOptionsContainer>
  );
};

const ActivitiesRow = (props: {
  activity: Activities;
  isSelected?: boolean;
  onCheck?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { activity, isSelected, onCheck } = props;
  const [isPopupClicked, setIsPopupClicked] = useState(false);
  const [isMouseOnPopup, setIsMouseOnPopUp] = useState(false);
  const isPopupDisplayed = isPopupClicked || isMouseOnPopup;

  const handelOnClick = () => {
    setIsPopupClicked(!isPopupClicked);
  };

  const handleOnBlur = (
    e: React.ChangeEvent<HTMLTableRowElement>
  ) => {
    setIsPopupClicked(false);
  };

  const handleMouseInsidePopup = () => {
    setIsMouseOnPopUp(true);
  };

  const handleMouseOutsidePopup = () => {
    setIsMouseOnPopUp(false);
  };
  // Fill the empty cell

  return (
    <TableRow
      onBlur={handleOnBlur}
      // onMouseLeave={handleMouseOutside}
      style={{
        position: "relative",
        backgroundColor: isSelected
          ? theme.colors.background
          : "white",
      }}
    >
      <TableCell>
        <CheckBox
          checked={isSelected}
          onChange={onCheck}
          type="checkbox"
          style={{ height: "20px", width: "20px" }}
        />
      </TableCell>
      <TableCell>{activity.name}</TableCell>
      <TableCell style={{textAlign: "center"}}>
        {activity.dateOfSubmission.toLocaleString()}
      </TableCell>
      <TableCell>
        {activity.activityResources.map((resource) => (
          <ResourceLink
            type={resource.type}
            label={resource.label ?? undefined}
            url={resource.url}
          />
        ))}
      </TableCell>
      <TableCell>
        <Button onClick={handelOnClick}>
          <MoreVertIcon />
        </Button>
      </TableCell>
      <PopupOptions
        isDisplayed={isPopupDisplayed}
        onMouseEnter={handleMouseInsidePopup}
        onMouseLeave={handleMouseOutsidePopup}
      >
        <MoreOptionsLinks
          onClick={() => {
            console.log("clicked");
          }}
          href={`/subjects/activity?activity=${activity.id}`}
        >
          View
        </MoreOptionsLinks>
        <MoreOptionsLinks
          href={`/subjects/activity/edit?activity=${activity.id}`}
        >
          Edit
        </MoreOptionsLinks>
      </PopupOptions>
    </TableRow>
  );
};

export type ActivityTableState = "NO_SELECTED" | "SELECTED";

const ActivitiesTable = (props: {
  state: ActivityTableState;
  activities: Array<Activities>;
}) => {
  const { activities, state } = props;
  const [selectedRow, setSelectedRow] = useState<readonly string[]>(
    []
  );

  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const occurrenceIndex = selectedRow.indexOf(id);
    let newSelectedRow: readonly string[] = [];

    if (occurrenceIndex === -1) {
      newSelectedRow = newSelectedRow.concat(selectedRow, id);
    } else if (occurrenceIndex === 0) {
      newSelectedRow = newSelectedRow.concat(selectedRow.slice(1));
    } else if (occurrenceIndex === selectedRow.length - 1) {
      newSelectedRow = newSelectedRow.concat(
        selectedRow.slice(0, -1)
      );
    } else if (occurrenceIndex > 0) {
      newSelectedRow = newSelectedRow.concat(
        selectedRow.slice(0, occurrenceIndex),
        selectedRow.slice(occurrenceIndex + 1)
      );
    }
    setSelectedRow(newSelectedRow);
  };

  const handleSelectAll = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked === true) {
      setSelectedRow(
        activities.map((activity) => {
          return activity.id;
        })
      );
      return;
    }

    setSelectedRow([]);
  };
  return (
    <Container>
      <TableOptions selectedRows={selectedRow} />
      <Table>
        <ColGroup>
          <Col width={"30px"}></Col>
          <Col width={"30%"}></Col>
          <Col width={"20%"}></Col>
          <Col></Col>
          <Col width={"30px"}></Col>
        </ColGroup>

        <ActivitiesTableHead
          numSelected={selectedRow.length}
          rowCount={activities.length}
          onSelectAllClick={handleSelectAll}
        />
        <TableBody>
          {activities.map((activity) => {
            const isSelected = selectedRow.indexOf(activity.id) > -1;
            return (
              <ActivitiesRow
                isSelected={isSelected}
                onCheck={(e) => handleCheck(e, activity.id)}
                activity={activity}
              />
            );
          })}
        </TableBody>
      </Table>
      <LabelContainer
        isDisplayed={
          activities.length === 0 || state === "NO_SELECTED"
        }
      >
        {state === "NO_SELECTED" ? (
          <Label>No Selected Subject</Label>
        ) : activities.length === 0 ? (
          <Label>No data to display</Label>
        ) : (
          <></>
        )}
      </LabelContainer>
    </Container>
  );
};

export default ActivitiesTable;
