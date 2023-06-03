import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import SideBar from "../compenents/ReactSideNav.jsx";
import styled from "styled-components";
import SideNavbar from "../compenents/SideNavBar.jsx";
import Navbar from "../compenents/Navbar.jsx";
import { useStateContext } from "../context/ContextProvider.jsx";
import { useEffect } from "react";
import axiosClient from "../utils/AxiosClient.jsx";
import { theme } from "../Theme.tsx";

const Container = styled.div`
  display: flex;
  height: auto;
  min-width: 1080px;
`;

const Left = styled.div`
  height: inherit;
  width: auto;
  background-color: red;
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
`;

const Wrapper = styled.div`
  width: 100%;
  overflow: scroll;
  height: auto;
  background-color: ${props => props.theme.colors.background};
`;

const SharePage = () => {
  const {user, token, setUser} = useStateContext()

    if(!token){
        return <Navigate to="/login" />
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      axiosClient.get('/user')
      .then(data=> {
        setUser(data)
      })
    }, [setUser])

  return (
    <>
      <Container>
        <Left>
          <SideNavbar />
        </Left>

        <Right>
          <NavBarContainer><Navbar /></NavBarContainer>
          <Wrapper>
            <Outlet />
          </Wrapper>
        </Right>
      </Container>
    </>
  );
};

export default SharePage;
