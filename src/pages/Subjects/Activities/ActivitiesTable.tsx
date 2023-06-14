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
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import LinkIcon from "@mui/icons-material/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { ColumnHeader } from "../../../utils/interfaces";
import styled from "styled-components";
import { relative } from "path";
import { EmptyArrayGenerator } from "../../../utils/ArrayGenerator";
import { Activities } from "./ClassSubjectsTable";
import { theme } from "../../../Theme";
import { Link } from "react-router-dom";

const headers: Array<ColumnHeader> = [
  { id: "title", label: "Title", minWidth: 100 },
  {
    id: "submissionDate",
    label: "Date of Submission",
    minWidth: 100,
  },
  { id: "resources", label: "Resources", minWidth: 100 },
];

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
  left: 94%;
  border: 1px solid black;
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

const ResourceLink = styled.a`
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 2px;
  padding: 2px 5px;

  &:hover {
    background-color: lightblue;
  }
`;

const ResourceWrapper = styled.button`
  all: unset;
  display: flex;
  align-items: center;
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

type ButtonType = "ADD" | "DELETE";

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

type ActivityResourceType = "Files" | "Link";

const ResourceLinks = (props: {
  type: ActivityResourceType;
  url: string;
  label: string;
}) => {
  const { type, url, label } = props;
  return (
    <ResourceWrapper>
      {type === "Files" ? (
        <ResourceLink download href={url}>
          <FileDownloadIcon
            style={{ fontSize: "20px", lineHeight: "20px" }}
          />
          {label}
        </ResourceLink>
      ) : (
        <ResourceLink href={url}>
          <LinkIcon
            style={{ fontSize: "20px", lineHeight: "20px" }}
          />
          {label}
        </ResourceLink>
      )}
    </ResourceWrapper>
  );
};

const TableOptions = (props: { selectedRows: readonly string[] }) => {
  const { selectedRows } = props;

  const handleAdd = () => {};

  const handleDelete = () => {};

  return (
    <TableOptionsContainer>
      <TableOptionsButtons buttonType="ADD">
        <AddIcon />
      </TableOptionsButtons>
      <TableOptionsButtons buttonType="DELETE">
        <DeleteIcon />
      </TableOptionsButtons>
    </TableOptionsContainer>
  );
};

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

const ActivitiesRow = (props: {
  activity: Activities;
  isSelected?: boolean;
  onCheck?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { activity, isSelected, onCheck } = props;
  const [isPopupClicked, setIsPopupClicked] = useState(false);
  const [isRowFocus, setIsRowFocus] = useState(false);
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
      <TableCell>
        {activity.dateOfSubmission.toLocaleString()}
      </TableCell>
      <TableCell>
        {activity.activityResources.map((resource) => (
          <ResourceLinks
            type={resource.type}
            label="url"
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

type ActivityTableState = "NO_SELECTED" | "SELECTED";

const ActivitiesTable = (props: {
  state: ActivityTableState;
  activities: Array<Activities>;
}) => {
  const { activities } = props;
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
    </Container>
  );
};

export default ActivitiesTable;
