import React, { SyntheticEvent } from "react";
import { studentList } from "../../../utils/data";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import DefaultImg from "../../../assets/profile_default.svg";
//"../../assets/profile_default.svg";
import { useState } from "react";
import {
  CredentialsRow,
  StudentProfileLong,
} from "../utils/interface";

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
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import Upload from "rc-upload";
import { Button, FormLabel } from "@mui/material";
import { Navigate, useLoaderData, useSearchParams } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  margin: auto auto;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Top = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const ImageContainer = styled.div`
  height: auto;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const Status = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: red;
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

const Wrapper = styled.div``;

const Right = styled.div`
  flex: 2;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  border: none;
  background-color: transparent;
`;

const Name = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  letter-spacing: 2px;
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

const InfoContainer = styled.div``;

const InfoList = styled.table`
  height: 80%;
`;

const InfoItem = styled.tr`
  height: 50px;
  font-size: 1.25rem;
`;
const InfoTitle = styled.th``;
const InfoDesc = styled.td`
  padding-left: 200px;
  text-align: left;
  text-transform: capitalize;
`;

const ViewStudent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("1");
  const [studentProfile, setStudentProfile] =
    useState<StudentProfileLong | null>(null);
  const [birthCert, setBirthCert] = useState<CredentialsRow>({
    file_type: "Birth Certificate",
    file_name: null,
    upload_date: null,
  });
  const [form137, setForm137] = useState<CredentialsRow>({
    file_type: "Form 137",
    file_name: null,
    upload_date: null,
  });

  const [goodMoral, setGoodMoral] = useState<CredentialsRow>({
    file_type: "Good Moral",
    file_name: null,
    upload_date: null,
  });

  const [form138, setForm138] = useState<CredentialsRow>({
    file_type: "Form 138",
    file_name: null,
    upload_date: null,
  });

  const [reportCard, setReportCard] = useState<CredentialsRow>({
    file_type: "Report Card",
    file_name: null,
    upload_date: null,
  });

  const { studentInfo, gradeLevels } = useLoaderData();
  const std_img = import.meta.env.VITE_URL + studentInfo.std_photo;

  //React-router params
  const [search] = useSearchParams();
  const id = search.get('id');

  //return to /students/all page if id is empty
  if(!id){
    return <Navigate to={"/students/all"} />
  }

  return (
    <Container>
      <Top>
        <Logo>LOGO</Logo>
        <CloseButton>
          <CloseIcon />
        </CloseButton>
      </Top>
      <Bottom>
        <Left>
          <Image
            src={std_img || DefaultImg}
            style={{ border: std_img ? "none" : "1px solid black" }}
          />
          <Status>Current Status: {studentInfo.std_status}</Status>
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
        <Right>
          <Name>{studentInfo.std_name || "N/A"}</Name>

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
              <TabPanel value="1">
                <InfoContainer>
                  <InfoList>
                    <tbody>
                      <InfoItem>
                        <InfoTitle>ID Number:</InfoTitle>
                        <InfoDesc>
                          {studentInfo?.std_id || "N/A"}
                        </InfoDesc>
                      </InfoItem>
                      <InfoItem>
                        <InfoTitle>Name:</InfoTitle>
                        <InfoDesc>
                          {studentInfo?.std_name || "N/A"}
                        </InfoDesc>
                      </InfoItem>
                      <InfoItem>
                        <InfoTitle>Gender:</InfoTitle>
                        <InfoDesc>
                          {studentInfo?.std_gender || "N/A"}
                        </InfoDesc>
                      </InfoItem>
                      <InfoItem>
                        <InfoTitle>Date of Birth:</InfoTitle>
                        <InfoDesc>
                          {studentInfo?.std_dob || "N/A"}
                        </InfoDesc>
                      </InfoItem>
                      <InfoItem>
                        <InfoTitle>Religion:</InfoTitle>
                        <InfoDesc>
                          {studentInfo?.std_religion || "N/A"}
                        </InfoDesc>
                      </InfoItem>
                      <InfoItem>
                        <InfoTitle>Father's Name:</InfoTitle>
                        <InfoDesc>
                          {studentInfo?.fathers_name || "N/A"}
                        </InfoDesc>
                      </InfoItem>
                      <InfoItem>
                        <InfoTitle>Mother's Name:</InfoTitle>
                        <InfoDesc>
                          {studentInfo?.mothers_name || "N/A"}
                        </InfoDesc>
                      </InfoItem>
                      <InfoItem>
                        <InfoTitle>Father's Occupation:</InfoTitle>
                        <InfoDesc>
                          {studentInfo?.fathers_occupation || "N/A"}
                        </InfoDesc>
                      </InfoItem>
                      <InfoItem>
                        <InfoTitle>Email:</InfoTitle>
                        <InfoDesc>
                          {studentInfo?.std_email || "N/A"}
                        </InfoDesc>
                      </InfoItem>
                      <InfoItem>
                        <InfoTitle>Admission:</InfoTitle>
                        <InfoDesc>
                          {studentInfo?.admission_date || "N/A"}
                        </InfoDesc>
                      </InfoItem>
                    </tbody>
                  </InfoList>
                </InfoContainer>
              </TabPanel>
              <TabPanel value="2">
                <CredentialsContainer>
                  <Form>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {credentialsColumn.map((column) => (
                            <TableCell
                              key={column.id}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{birthCert.file_type}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              component="label"
                              style={{
                                backgroundColor: "lightgray",
                                color: "black",
                              }}
                            >
                              Upload
                              <input
                                hidden
                                type="file"
                                name=""
                                id=""
                              />
                            </Button>
                          </TableCell>
                          <TableCell>
                            {birthCert.file_name || "N/A"}
                          </TableCell>
                          <TableCell>
                            {birthCert.upload_date || "N/A"}
                          </TableCell>
                          <TableCell>
                            <FileDownloadIcon />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{form137.file_type}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              component="label"
                              style={{
                                backgroundColor: "lightgray",
                                color: "black",
                              }}
                            >
                              Upload
                              <input
                                hidden
                                type="file"
                                name=""
                                id=""
                              />
                            </Button>
                          </TableCell>
                          <TableCell>
                            {form137.file_name || "N/A"}
                          </TableCell>
                          <TableCell>
                            {form137.upload_date || "N/A"}
                          </TableCell>
                          <TableCell>
                            <FileDownloadIcon />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{goodMoral.file_type}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              component="label"
                              style={{
                                backgroundColor: "lightgray",
                                color: "black",
                              }}
                            >
                              Upload
                              <input
                                hidden
                                type="file"
                                name="good_moral"
                                id=""
                                placeholder="Upload"
                                style={{ display: "none" }}
                              />
                            </Button>
                          </TableCell>
                          <TableCell>
                            {goodMoral.file_name || "N/A"}
                          </TableCell>
                          <TableCell>
                            {goodMoral.upload_date || "N/A"}
                          </TableCell>
                          <TableCell>
                            <FileDownloadIcon />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{form138.file_type}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              component="label"
                              style={{
                                backgroundColor: "lightgray",
                                color: "black",
                              }}
                            >
                              Upload
                              <input
                                hidden
                                type="file"
                                name=""
                                id=""
                              />
                            </Button>
                          </TableCell>
                          <TableCell>
                            {form138.file_name || "N/A"}
                          </TableCell>
                          <TableCell>
                            {form138.upload_date || "N/A"}
                          </TableCell>
                          <TableCell>
                            <FileDownloadIcon />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            {reportCard.file_type}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              component="label"
                              style={{
                                backgroundColor: "lightgray",
                                color: "black",
                              }}
                            >
                              Upload
                              <input
                                hidden
                                type="file"
                                name=""
                                id=""
                              />
                            </Button>
                          </TableCell>
                          <TableCell>
                            {reportCard.file_name || "N/A"}
                          </TableCell>
                          <TableCell>
                            {reportCard.upload_date || "N/A"}
                          </TableCell>
                          <TableCell>
                            <FileDownloadIcon />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Form>
                </CredentialsContainer>
              </TabPanel>
              <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
          </Box>
        </Right>
      </Bottom>
    </Container>
  );
};

export default ViewStudent;
