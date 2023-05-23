import React from "react";
import "../assets/css/Dashboard.css";
import Sidebar from "../compenents/ReactSideNav.jsx";
import SideNavbar from "../compenents/SideNavBar";
import styled from "styled-components";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "../compenents/Chip";
import SchoolIcon from "@mui/icons-material/School";
import TeacherIcon from "../assets/teacher.svg";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import { Calendar } from "../compenents/Calendar";
import Reminders from "../compenents/Reminders";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #aac4d1f4;
  padding: 40px;
`;

const PageTitle = styled.h1``;

const ChipsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
`;

const Bottom = styled.div`
  display:flex;
  align-items:center;
  gap: 20px;`;
const CalendarContainer = styled.div``;
const ReminderContainer = styled.div``;


function Dashboard() {
  return (
    <Container>
      <PageTitle>Admin Dashboard</PageTitle>
      <Breadcrumbs>
        <div>Home</div>
      </Breadcrumbs>

      <ChipsContainer>
        <Chip
          icon={<SchoolIcon style={{ fontSize: "40px" }} />}
          color={"green"}
          title={"Students"}
          data={10000}
        />
        <Chip
          icon={<MenuBookOutlinedIcon style={{ fontSize: "40px" }} />}
          color={"green"}
          title={"Students"}
          data={10000}
        />
        <Chip
          icon={<SchoolIcon style={{ fontSize: "40px" }} />}
          color={"green"}
          title={"Students"}
          data={10000}
        />
        <Chip
          icon={<SchoolIcon style={{ fontSize: "40px" }} />}
          color={"green"}
          title={"Students"}
          data={10000}
        />
      </ChipsContainer>
      <Bottom>
      <Calendar />
      <Reminders />
      </Bottom>

      {/* <div>
        <div className="container">
          <div className="item item1">1</div>
          <div className="item item2">2</div>
          <div className="item item3">3</div>
          <div className="item item4">4</div>
          <div className="item item5">5</div>
          <div className="item item6">6</div>
          <div className="item item7">7</div>
          <div className="item item8">8</div>
          <div className="item item9">9</div>
        </div>
      </div> */}
    </Container>
  );
}

export default Dashboard;
