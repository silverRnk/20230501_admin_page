import React, { useState, useEffect } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import CedarLogo from "../assets/cedarhills.png";
import "./SideNavBar.css";
import styled from "styled-components";
import ParentIcon from "@mui/icons-material/SupervisorAccount";
//Mui
import { Dashboard, Backpack } from "@mui/icons-material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import PieChartIcon from "@mui/icons-material/PieChart";
import LogoutIcon from "@mui/icons-material/Logout";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

//Utils
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../utils/AxiosClient";

//Custom Icons
import StudentIcons from "./SvgIcons/StudentIcons";
import TeacherIcon from "./SvgIcons/TeacherIcon";
import BookIcon from "./SvgIcons/BookIcon";
import AccountIcon from "./SvgIcons/AccountIcon";
import { theme } from "../Theme";

const SideBarContainer = styled.div`
  width: auto;
  height: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  position: relative;
  z-index: 11;
  overflow-y: scroll;

  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar{
    display: none;
  }
`;

const SideBarHeader = styled.div`
  display: flex;
  height: 100px;
  margin-bottom: 10px;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.secondary};
`;

const Logo = styled.img`
  height: 50px;
  width: 50px;
  display: ${(props) => (props.isColloapsed ? "none" : "inline")};
`;

const CollapseBtn = styled.button`
  height: 50px;
  width: 50px;
  border: none;
  background-color: transparent;
`;

function SideNavbar() {
  const { collapseSidebar, collapsed } = useProSidebar();
  const [width, setWidth] = useState("");
  const [collapse, setCollapsed] = useState(false);
  const { setToken, setUser } = useStateContext();

  function getSize() {
    setWidth(window.innerWidth);
  }
  // useEffect(() => {
  //   window.addEventListener("resize", getSize);
  //   if (width < 400) {
  //     setCollapsed(true);
  //   } else {
  //     setCollapsed(false);
  //   }
  //   return () => {
  //     window.removeEventListener("resize", getSize);
  //   };
  // }, [width.innerWidth]);

  console.log(collapsed);

  const onLogout = () => {
    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  return (
    <SideBarContainer>
      <Sidebar
        className="sidebar"
        style={{
          backgroundColor: theme.colors.primary,
        }}
        rootStyles={{
          position: "sticky",
          top: "0",
          zIndex: "2",
          backgroundColor: theme.colors.primary,
        }}
        defaultCollapsed
      >
        <SideBarHeader>
          <Logo src={CedarLogo} isColloapsed={collapsed} />
          <CollapseBtn onClick={() => collapseSidebar()}>
            {collapsed ? (
              <MenuIcon style={{ color: "white" }} />
            ) : (
              <MenuOpenIcon style={{ color: "white" }} />
            )}
          </CollapseBtn>
        </SideBarHeader>

        {/* <Menu>
          <MenuItem
            icon={<MenuOpenIcon style={{ color: "white" }}
             />}
          > <Logo src={CedarLogo} /></MenuItem>
        </Menu> */}

        <Menu style={{ backgroundColor: theme.colors.primary }}>
          <MenuItem
            icon={<Dashboard />}
            component={<Link to={"/dashboard"} />}
          >
            Dashboard
          </MenuItem>
          <SubMenu
            label="Students"
            icon={<StudentIcons color="white" />}
          >
            <MenuItem
              className="sub-menu-item"
              component={<Link to="/students/all" />}
            >
              All Students
            </MenuItem>
            <MenuItem
              className="sub-menu-item"
              component={<Link to="/students/add_student" />}
            >
              Add Student
            </MenuItem>
            <MenuItem
              className="sub-menu-item"
              component={<Link to="/students/student_admit_form" />}
            >
              Student Promotion
            </MenuItem>
          </SubMenu>
          <MenuItem icon={<ParentIcon />}>Parents</MenuItem>
          <SubMenu label="Teachers" icon={<TeacherIcon />}>
            <MenuItem
              className="sub-menu-item"
              component={<Link to="/teachers/all" />}
            >
              All Teachers
            </MenuItem>
            <MenuItem
              className="sub-menu-item"
              component={<Link to="/teachers/add" />}
            >
              Add Teacher
            </MenuItem>
          </SubMenu>
          <SubMenu label="Account" icon={<AccountIcon />}>
            <MenuItem className="sub-menu-item" icon={<Backpack />}>
              {" "}
              Pie charts{" "}
            </MenuItem>
            <MenuItem className="sub-menu-item" icon={<Dashboard />}>
              {" "}
              Line charts{" "}
            </MenuItem>
          </SubMenu>
          <SubMenu label="Subjects" icon={<BookIcon />}>
            <MenuItem
              className="sub-menu-item"
              component={<Link to={"/subjects/all"} />}
            >
              All Subjects
            </MenuItem>
            <MenuItem
              className="sub-menu-item"
              component={<Link to={"/subjects/activities"} />}
            >
              Activities
            </MenuItem>
          </SubMenu>

          <SubMenu label="Charts" icon={<PieChartIcon />}>
            <MenuItem className="sub-menu-item" icon={<Backpack />}> Pie charts </MenuItem>
            <MenuItem className="sub-menu-item" icon={<Dashboard />}> Line charts </MenuItem>
          </SubMenu>
          <MenuItem> Documentation </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem icon={<LogoutIcon />} onClick={onLogout}>
            {" "}
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </SideBarContainer>
  );
}

export default SideNavbar;
