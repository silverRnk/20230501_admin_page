//React Imports
import React, { SyntheticEvent, useEffect } from "react";
import { useState } from "react";
import {
  Navigate,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";

//Image Imports
import DefaultImg from "../../../assets/profile_default.svg";
import SchoolLogo from "../../../assets/cedarhills.png";

//Interfaces
import {
  CredentialsRow,
  StudentProfileLong,
} from "../utils/interface";
import { Grade, GradesPerSY } from "../../../utils/interfaces";

//Mui Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { credentialsColumn } from "../utils/ColumnLabels";

//Mui Form
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Select from "@mui/material/Select";

//Mui Tabs
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

//Mui Icons
import CloseIcon from "@mui/icons-material/Close";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button, FormLabel } from "@mui/material";

//Customize Components
import GradesTable from "./GradesTable";
import StudentDetails from "./StudentDetails";
import { theme } from "../../../Theme";
import ProfileImg from "../../../compenents/ProfileImg";
import ProfileName from "../../../compenents/ProfileName";
import StudentsCredentials from "./StudentsCredentials";
import axiosClient from "../../../utils/AxiosClient";

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


const Status = styled.p`
  ${(props) => props.theme.fontThemes.h4}
  margin-bottom: 40px;
  text-transform: capitalize;
`;

const UpdateButton = styled.button`
  background-color: lightgray;
  text-transform: uppercase;
  font-size: 1.05rem;
  border-radius: 5px;
  box-shadow: 1px 1px 1px lightgray;
  transition: all 0.5s;

  :hover {
    box-shadow: 3px 3px 3px lightgray;
  }
`;


const Right = styled.div`
  flex: 2;
`;

const CredentialsContainer = styled.div`
  width: 80%;
`;

const Form = styled.form`
  display: "flex";
  flex-direction: "row";
  gap: "15px";
  padding-left: 20px;
  display: flex;
  flex-direction: column;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InfoContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
`;

const GradesTableWrapper = styled.div`
  height: max(auto, 500px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  gap: 20px;
  padding: 10px;
`;

const GradeTableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0px;
`;
const GradeTableTitle = styled.h3`
  ${(props) => props.theme.fontThemes.h3}
`;
const GradeSYSelection = styled.select`
  margin-right: 10px;
  padding: 10px 10px;
`;
const GradesSYOption = styled.option``;


const loadStudentProfile = async (id: number | string) => {
    
    const response = await axiosClient.get(`/admin/student/${id}`) ?? null

    const studentInfo:StudentProfileLong = response?.data?.data?.[0] ?? {}
    const gradeLevels = response?.data?.grade_levels ?? []

    return {studentInfo, gradeLevels}
}

const ViewStudent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("1");
  const [studentProfile, setStudentProfile] =
    useState<StudentProfileLong | null>(null);

  const std_img = import.meta.env.VITE_URL + studentProfile?.profile_img;

  const gradesPerSY: GradesPerSY | null = null;

  const [isLoading, setIsLoading] = useState<boolean>(true)
  //get react-router params
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  //return to /students/all page if id is empty
  if (!id) {
    return <Navigate to={"/students/all"} />;
  }

  useEffect(() => {
    loadStudentProfile(id)
    .then(data => {
      setStudentProfile(data?.studentInfo)
      setIsLoading(false)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <Container>
      <Top>
        <LogoImg src={SchoolLogo} alt="School Logo" />
      </Top>
      <Bottom>
        <Left>
          <ProfileImg image={std_img} isLoading={isLoading} />
          <Status>Current Status: {studentProfile?.status}</Status>
          <FormWrapper>
            <FormLabel required={true}>Update Status:</FormLabel>
            <FormControl
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "15px",
                width: "100%",
                marginBottom: "10px",
              }}
              component={"form"}
              onSubmit={() => console.log("Hello")}
            >
              <Select
                labelId="update_status_id"
                label="Update Status"
                style={{ flex: 1 }}
              >
                <MenuItem>Old</MenuItem>
                <MenuItem>New</MenuItem>
                <MenuItem>Transferee</MenuItem>
              </Select>
              <UpdateButton style={{ width: "80px" }}>
                Update
              </UpdateButton>
            </FormControl>
          </FormWrapper>

          <FormControl
            style={{
              display: "grid",
              gridTemplateRows: "1fr 0.75fr",
              gap: "15px",
              width: "100%",
            }}
          >
            <FormGroup
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "10px",
                width: "100%",
              }}
            >
              <FormControl style={{ flex: 1 }}>
                <FormLabel required={true}>Grade:</FormLabel>
                <Select
                  labelId="grade"
                  label="grade"
                  required={true}
                  style={{ flex: 1 }}
                >
                  <MenuItem>Old</MenuItem>
                </Select>
              </FormControl>

              <FormControl style={{ flex: 1 }}>
                <FormLabel required={true}>Section:</FormLabel>
                <Select
                  labelId="section"
                  label="section"
                  required={true}
                  style={{ flex: 1 }}
                >
                  <MenuItem>Old</MenuItem>
                </Select>
              </FormControl>
            </FormGroup>

            <UpdateButton>Update</UpdateButton>
          </FormControl>
        </Left>

        {
          // Right Size
        }
        <Right>
          <ProfileName name={studentProfile?.name || ''} isLoading={isLoading} />

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
                  <Tab label="Credentials" value="2" />
                  <Tab label="Grades" value="3" />
                </TabList>
              </Box>

              {
                //Tab1
              }
              <TabPanel value="1">
                <InfoContainer>
                  <StudentDetails
                    data={studentProfile}
                    isLoading={isLoading}
                  />
                </InfoContainer>
              </TabPanel>

              {
                //Tab2
              }
              <TabPanel value="2">
                <StudentsCredentials id={studentProfile?.id_number} />

              </TabPanel>
              <TabPanel value="3">
                <GradesTableWrapper>
                  <GradeTableHeader>
                    <GradeTableTitle>Grades</GradeTableTitle>
                    <GradeSYSelection>
                      <GradesSYOption value={""}>
                        {" "}
                        -- Select --
                      </GradesSYOption>
                    </GradeSYSelection>
                  </GradeTableHeader>
                  <GradesTable
                    grades={gradesPerSY?.grades ?? []}
                    isEmpty={!gradesPerSY}
                  />
                </GradesTableWrapper>
              </TabPanel>
            </TabContext>
          </Box>
        </Right>
      </Bottom>
    </Container>
  );
};

export default ViewStudent;
