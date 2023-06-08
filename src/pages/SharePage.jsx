import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import SideBar from "../compenents/ReactSideNav.jsx";
import styled from "styled-components";
import SideNavbar from "../compenents/SideNavBar.jsx";
import Navbar from "../compenents/Navbar.jsx";
import { useStateContext } from "../context/ContextProvider.tsx";
import { useEffect } from "react";
import axiosClient from "../utils/AxiosClient.jsx";
import { theme } from "../Theme.tsx";
import PopupDialog from "../compenents/PopupDialog.tsx";

const Container = styled.div`
  display: flex;
  height: auto;
  min-width: 1080px;
`;

const Left = styled.div`
  height: inherit;
  width: auto;
  background-color: red;
  position: relative;
`;

const Right = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const NavBarContainer = styled.div`
  width: 100%;
  position: relative;
`;

const Wrapper = styled.main`
  flex: 1;
  width: 100%;
  overflow-x: auto;
  overflow-y: scroll;
  height: auto;
  position: relative;
  background-color: ${(props) => props.theme.colors.background};
`;

const PopupDialogContainer = styled.div`
  height: auto;
  width: auto;
  display: ${props => props.isEmpty? "none": "flex"};
  flex-direction: column-reverse;
  gap: 10px;
  position: absolute;
  bottom: 15vh;
  right: 15vh;
  z-index: 10;
`;

const SharePage = () => {
  const {token, dialogMessages, deleteDialogMessages } =
    useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   axiosClient.get("/user").then((data) => {
  //     setUser(data);
  //   });
  // }, [setUser]);

  const handlerDeleteDialog = (message) => {
    deleteDialogMessages(message);
  };

  return (
    <>
      <Container>
        <Left>
          <SideNavbar />
        </Left>

        <Right>
          <NavBarContainer>
            <Navbar />
          </NavBarContainer>
          <Wrapper>
            <Outlet />
          </Wrapper>
        </Right>
        <PopupDialogContainer className="dialog-container" isEmpty={dialogMessages.length == 0} >
          {dialogMessages.map((dialogItem,index) => {
            console.log(dialogItem)
            return <PopupDialog
            message={dialogItem.message}
            messageType={dialogItem.messageType}
            onTimeOut={() => handlerDeleteDialog(dialogItem)}
            onDelete={() => handlerDeleteDialog(dialogItem)}
            key={dialogItem.id}
            duration={5 + index}
          />
          })}
        </PopupDialogContainer>
      </Container>
    </>
  );
};

export default SharePage;
