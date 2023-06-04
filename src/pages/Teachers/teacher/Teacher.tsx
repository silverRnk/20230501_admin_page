import React, { SyntheticEvent, useState } from "react";
import styled from "styled-components";

import SchoolLogo from "../../../assets/cedarhills.png";
import ProfileImg from "../../../compenents/ProfileImg";
import ProfileName from "../../../compenents/ProfileName";

//Mui Tabs
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const Container = styled.div`
  width: 100%;
  margin: auto auto;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 0px 0px 7px lightgray;
`;

const Top = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: start;
`;

const LogoImg = styled.img`
  height: 75px;
  width: 75px;
`;

const Bottom = styled.div`
  width: 100%;
  display: flex;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Right = styled.div`
  flex: 2;
`;

const Teacher = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<string>("1");

  return (
    <Container>
      <Top>
        <LogoImg src={SchoolLogo} alt="School Logo" />
      </Top>
      <Bottom>
        <Left>
          <ProfileImg image="" isLoading={isLoading} />
        </Left>
        <Right>
          <ProfileName name="" isLoading={isLoading} />

          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={selectedTab}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={(
                    event: SyntheticEvent,
                    newValue: string
                  ) => setSelectedTab(newValue)}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Profile" value="1" />
                </TabList>
              </Box>
              <TabPanel value="1">Profile Details</TabPanel>
            </TabContext>
          </Box>
        </Right>
      </Bottom>
    </Container>
  );
};

export default Teacher;
