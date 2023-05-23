import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

import Sidebar from "../../compenents/ReactSideNav.jsx";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  background-color: #F0F1F3;
`;

const PageHeader = styled.h1`
  width: 100%;
  margin-bottom: 20px;
`;

const LinkContainer = styled.ul`
  width: 100%;
  display: flex;
  margin-bottom: 50px;
  padding-left: 0px;

`;

const LinkItem = styled.li`
  list-style-type: none;
  margin: 0 10px 0 0;
`;

const NLink = styled.a``;

const Students = () => {
  return (
    <>
    <Container>
      <PageHeader>Students</PageHeader>

      <LinkContainer>
        <LinkItem>
          <NLink href="#">Home</NLink>
        </LinkItem>
        <LinkItem>
        {'>'}
        </LinkItem>
        <LinkItem>
          <NLink href="#">Students</NLink>
        </LinkItem>
      </LinkContainer>
      <Outlet/>
    </Container>
    </>
  );
};

export default Students;
