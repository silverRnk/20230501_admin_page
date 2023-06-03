import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;

const PageHeader = styled.h1`
  ${props => props.theme.fontThemes.h1}
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

const Subjects = () => {
  return (
    <>
    <Container>
      <PageHeader>Subject</PageHeader>

      <LinkContainer>
        <LinkItem>
          <NLink href="#">Home</NLink>
        </LinkItem>
        <LinkItem>
        {'>'}
        </LinkItem>
        <LinkItem>
          <NLink href="#">Teachers</NLink>
        </LinkItem>
      </LinkContainer>
      <Outlet/>
    </Container>
    </>
  )
}

export default Subjects