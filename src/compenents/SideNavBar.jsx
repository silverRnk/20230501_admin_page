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
import CedarLogo from "../pictures/cedarhills.png";
import { Dashboard, Backpack } from "@mui/icons-material";
import "./SideNavBar.css";
import styled from "styled-components";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import PieChartIcon from "@mui/icons-material/PieChart";
import LogoutIcon from '@mui/icons-material/Logout';
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../utils/AxiosClient";

const SideBarContainer = styled.div`
  width: auto;
  height: 100%;
  background-color: rgb(249, 249, 249, 0.7);
`;

const SideBarHeader = styled.div`
  display: flex;
  height: 100px;
  margin-bottom: 10px;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
  background-color: red;
`;

const Logo = styled.img`
  height: 100%;
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
  const {setToken, setUser} = useStateContext()

  function getSize() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", getSize);
    if (width < 400) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
    return () => {
      window.removeEventListener("resize", getSize);
    };
  }, [width.innerWidth]);

  console.log(collapsed);

  const onLogout = () => {
    axiosClient.post('/logout')
    .then(() => {
      setUser({})
      setToken(null)
    })
  }

  return (
    <SideBarContainer>
      <Sidebar
        className="sidebar"
        rootStyles={{
          position: "sticky",
          top: "0",
          zIndex: "2",
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

        <Menu>
          <MenuItem
            icon={<Dashboard />}
            component={<Link to={"/dashboard"} />}
          >
            Dashboard
          </MenuItem>
          <SubMenu label="Students" icon={<Backpack />}>
            <MenuItem component={<Link to="/students/all" />}>
              All Students
            </MenuItem>
            <MenuItem component={<Link to="/students/add_student" />}>
              Add Student
            </MenuItem>
            <MenuItem component={<Link to="/students/student_admit_form" />}>
              Student Promotion
            </MenuItem>
          </SubMenu>
          <SubMenu label="Charts" icon={<PieChartIcon />}>
            <MenuItem icon={<Backpack />}> Pie charts </MenuItem>
            <MenuItem icon={<Dashboard />}> Line charts </MenuItem>
          </SubMenu>
          <MenuItem> Documentation </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem icon={<LogoutIcon />} onClick={onLogout}> Logout</MenuItem>
        </Menu>
      </Sidebar>
    </SideBarContainer>
  );
}

export default SideNavbar;
