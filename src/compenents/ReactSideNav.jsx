import React from 'react'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { Backpack, Addchart } from '@mui/icons-material';
import "./ReactSideNav.css";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
function ReactSideNav() {
  return (
  <SideNav className="sidenav"
    onSelect={selected =>{
        console.log(selected)
    }}
    
    >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="home">
                <NavIcon><Addchart/></NavIcon>
                <NavText>Dashboard</NavText>
            </NavItem>
            <NavItem eventKey="students">
                <NavIcon><Backpack/></NavIcon>
                <NavText>Students</NavText>
                <NavItem eventKey="all">
                    <NavText>All Students</NavText>
                </NavItem>
                <NavItem>
                    <NavText>Add Students</NavText>
                </NavItem>
                <NavItem>
                    <NavText>Students Promotions</NavText>
                </NavItem>
            </NavItem>
            <NavItem eventKey="teachers">
                <NavIcon><Addchart/></NavIcon>
                <NavText>Teachers</NavText>
                <NavItem>
                    <NavText>All Teachers</NavText>
                </NavItem>
                <NavItem>
                    <NavText>Add Teachers</NavText>
                </NavItem>
            </NavItem>
            <NavItem eventKey="accounts">
                <NavIcon><Addchart/></NavIcon>
                <NavText>Accounts</NavText>
                <NavItem>
                    <NavText>Fees Group</NavText>
                </NavItem>
                <NavItem>
                    <NavText>Student Fees</NavText>
                </NavItem>
                <NavItem>
                    <NavText>Expenses</NavText>
                </NavItem>
                <NavItem>
                    <NavText>Add Expenses</NavText>
                </NavItem>
            </NavItem>
            <NavItem eventKey="subject">
                <NavIcon><Addchart/></NavIcon>
                <NavText>Subjects</NavText>
            </NavItem>
            <NavItem eventKey="Settings">
                <NavIcon><Addchart/></NavIcon>
                <NavText>Settings</NavText>
            </NavItem>
        </SideNav.Nav>
    </SideNav>
  )
}

export default ReactSideNav;