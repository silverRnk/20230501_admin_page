import React, { SyntheticEvent, useEffect, useState } from "react";
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
import TeacherProfileDetails from "../../../compenents/TeacherProfileDetails";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosClient from "../../../utils/AxiosClient";
import { TeacherProfileLong } from "../utils/interface";
import { useStateContext } from "../../../context/ContextProvider";

const Container = styled.div`
  min-height: 800px;
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

const ProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Teacher = () => {
  const { addDialogMessages } = useStateContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<string>("1");
  const [teacherProfile, setTeacherProfile] =
    useState<TeacherProfileLong | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get("id");

  useEffect(() => {
    if (!idParam) {
      navigate("/teachers/all");
    }

    axiosClient
      .get(`/admin/teachers/teacher/${idParam}`)
      .then((data) => {
        setTeacherProfile(data?.data?.data[0] as TeacherProfileLong);
        setIsLoading(false);
        console.log(teacherProfile);
      })
      .catch((err) => {
        addDialogMessages({message: err.toString(), messageType: "Error"})
      });
  }, []);

  return (
    <Container className="pageMinHeight">
      <Top>
        <LogoImg src={SchoolLogo} alt="School Logo" />
      </Top>
      <Bottom>
        <Left>
          <ProfileImg
            image={import.meta.env.VITE_URL + teacherProfile?.teacher_profile_img}
            isLoading={isLoading}
          />
        </Left>
        <Right>
          <ProfileName
            name={teacherProfile?.teacher_name}
            isLoading={isLoading}
          />

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
              <TabPanel value="1">
                <ProfileWrapper>
                  <TeacherProfileDetails
                    data={teacherProfile}
                    isLoading={isLoading}
                  />
                </ProfileWrapper>
              </TabPanel>
            </TabContext>
          </Box>
        </Right>
      </Bottom>
    </Container>
  );
};

export default Teacher;
