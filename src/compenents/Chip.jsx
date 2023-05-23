import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 20px;
  box-shadow: 5px 5px 5px gray;
  border-radius: 5px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconContainer = styled.div`
  height: 70px;
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin: 0px 20px;
  color: white;
`;

const Right = styled.div`
  flex: 1;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 0px 10px;
  border-left: 2px solid red;
`;

const Title = styled.h3`
  font-size: 0.9rem;
  color: gray;
  margin: 0;
`;
const Desc = styled.p`
  font-size: 1.25rem;
  font-weight: 900;
  margin: 0;
`;

const Chip = ({ icon, title, data , color}) => {
  return (
    <Container>
      <Left>
        <IconContainer color={color}>{icon}</IconContainer>
      </Left>

      <Right>
        <Title>{title}</Title>
        <Desc>{data}</Desc>
      </Right>
    </Container>
  );
};

export default Chip;
