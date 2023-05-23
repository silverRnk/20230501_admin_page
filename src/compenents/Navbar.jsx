import React from "react";
import "./Navbar.css";
import { NavbarData } from "./NavbarData.jsx";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import DefaultImg from '../assets/profile_default.svg'

const Container = styled.nav`
  padding: 20px 10px;
  background-color: white;
  box-shadow: 0 0 10px gray;
  display: flex;
  align-items: center;
  min-width: 900px;
  position:relative;
`;

const Left = styled.div`
  flex: 3;
  background-color: yellow;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  margin-left: 10px;
  border: none;
  padding: 10px;
`;

const Right = styled.div`
  flex: 5;
  position:sticky;
  right:0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ButtonContainer = styled.div`
  border-right: 3px solid red;
  margin-right: 20px;
`;
const ButtonItem = styled.button`
  margin-right: 20px;
  border: none;
  background-color: transparent;
  color: red;
  font-size: 1.25rem;
`;

const ProfileContainer = styled.div`
  display:flex;
  align-items: center;
  gap: 10px;`
const ProfileImage = styled.img`
  height:40px;
  width:40px;
  border-radius: 50%;
  `

function Navbar() {
  return (
    <Container>
      <Left>
        {/* <SearchContainer>
          <SearchIcon />
          <Input placeholder="Search" />
        </SearchContainer> */}
      </Left>
      <Right>
        <ButtonContainer>
          <ButtonItem>
            <MailOutlineIcon />
          </ButtonItem>
          <ButtonItem>
            <NotificationsNoneOutlinedIcon />
            
          </ButtonItem>
        </ButtonContainer>

        <ProfileContainer>
          <ProfileImage src={DefaultImg} / >
          <ArrowDropDownOutlinedIcon />
        </ProfileContainer>
      </Right>
    </Container>
  );
}

export default Navbar;
