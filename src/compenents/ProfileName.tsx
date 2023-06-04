import React from "react";
import styled from "styled-components";
import { PlaceHolderStyle } from "./style-components/StyleComponents";

//Mui Tabs
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const Name = styled.h2`
  ${(props) => props.theme.fontThemes.h2}
`;

const NameLoading = styled.h2`
  height: 2rem;
  width: 300px;
  ${PlaceHolderStyle}
`;

const ProfileName = (args: { name: string; isLoading: boolean }) => {
  const { name, isLoading } = args;
  return isLoading ? <NameLoading /> : <Name>{name || "N/A"}</Name>;
};

export default ProfileName;
