import React, { SyntheticEvent } from "react";
import { studentList } from "../../utils/data";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import DefaultImg from "../../assets/profile_default.svg";
import { useState } from "react";
import {
  CredentialsRow,
  StudentProfileLong,
} from "./utils/interface";

//Mui Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { credentialsColumn } from "./utils/ColumnLabels";

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
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import Upload from "rc-upload";
import { Button, FormLabel } from "@mui/material";

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
  width: 65%;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const Status = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: red;
  margin-bottom: 40px;
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

const Name = styled.h1``;

const CredentialsContainer = styled.div`
  width: 80%;
`;

const Form = styled.form``;
const InfoContainer = styled.div`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
`;
const InfoList = styled.table`
  height: 80%;
`;

const InfoItem = styled.tr`
  height: 50px;
  font-size: 1.25rem;
`;
const InfoTitle = styled.th``;
const InfoDesc = styled.td`
  text-align: center;
`;

const ViewStudent = () => {
  const std_img = null;
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
          <Status>Current Status: Transfer</Status>

          <FormControl
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "15px",
              width: "100%",
            }}
          >
            <InputLabel id="update_status_id">
              Update Status:
            </InputLabel>
            <Select
              labelId="update_status_id"
              label="Update Status"
              style={{ flex: 1 }}
            >
              <MenuItem>Old</MenuItem>
            </Select>

            <button
              style={{ display: "block", padding: "10px 20px" }}
            >
              Update
            </button>
          </FormControl>

          <FormControl
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              width: "100%",
            }}
          >
            <FormGroup
              style={{
                display: "flex",
                flexDirection: "row",
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

            <button
              style={{ display: "block", padding: "10px 20px" }}
            >
              Update
            </button>
          </FormControl>
        </Left>
        <Right>
          <Name>{studentProfile?.name || "N/A"}</Name>

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
                          {studentProfile?.id_number || "N/A"}
                        </InfoDesc>
                      </InfoItem>
                      <InfoItem>
                        <InfoTitle>Name:</InfoTitle>
                        <InfoDesc>
                          {studentProfile?.name || "N/A"}
                        </InfoDesc>
                      </InfoItem>
                      <InfoItem>
                        <InfoTitle>Gender:</InfoTitle>
                        <InfoDesc>
                          {studentProfile?.gender || "N/A"}
                        </InfoDesc>
                      </InfoItem>
                      <InfoItem>
                        <InfoTitle>Date of Birth:</InfoTitle>
                        <InfoDesc>
                          {studentProfile?.date_of_birth || "N/A"}
                        </InfoDesc>
                      </InfoItem>
                      <InfoItem>
                        <InfoTitle>Religion:</InfoTitle>
                        <InfoDesc>
                          {studentProfile?.religion || "N/A"}
                        </InfoDesc>
                      </InfoItem>
                      <InfoItem>
                        <InfoTitle>Father's Name:</InfoTitle>
                        <InfoDesc>
                          {studentProfile?.father_name || "N/A"}
                        </InfoDesc>
                      </InfoItem>
                      <InfoItem>
                        <InfoTitle>Mother's Name:</InfoTitle>
                        <InfoDesc>
                          {studentProfile?.mother_name || "N/A"}
                        </InfoDesc>
                      </InfoItem>
                      <InfoItem>
                        <InfoTitle>Father's Occupation:</InfoTitle>
                        <InfoDesc>
                          {studentProfile?.father_occupation || "N/A"}
                        </InfoDesc>
                      </InfoItem>
                      <InfoItem>
                        <InfoTitle>Email:</InfoTitle>
                        <InfoDesc>
                          {studentProfile?.e_mail || "N/A"}
                        </InfoDesc>
                      </InfoItem>
                      <InfoItem>
                        <InfoTitle>Admission:</InfoTitle>
                        <InfoDesc>
                          {studentProfile?.admission_date || "N/A"}
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
