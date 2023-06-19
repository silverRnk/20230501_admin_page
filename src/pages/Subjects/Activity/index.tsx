import React, { useState } from "react";
import { PageContainer } from "../../../compenents/style-components/PageStyleComponents";
import styled from "styled-components";
import { Button } from "../../../compenents/forms/Forms";
import ActivityInfo, { ActivityInformation } from "./ActivityInfo";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

const Left = styled.div`
  flex: 1;
  background-color: yellow;
`;

const Title = styled.h2``
const ButtonsWrapper = styled.div``
const InfoWrapper = styled.div``
const FilesWrapper=styled.div``

const Right = styled.div`
  flex: 3;
  background-color: blue;
  height: 1000px;
`;

const Activity = () => {
  const [activityInfo, setActivityInfo] = useState<ActivityInformation | null>(null)
  return (
    <PageContainer>
      <Wrapper>
        <Left>
            <Title>Title</Title>
            <ButtonsWrapper>
                <Button>Edit</Button>
                <Button>Delete</Button>
            </ButtonsWrapper>
            <InfoWrapper>
              <ActivityInfo info={activityInfo} state="Loading"/>
            </InfoWrapper>
            <FilesWrapper>
                
            </FilesWrapper>
        </Left>
        <Right></Right>
      </Wrapper>
    </PageContainer>
  );
};

export default Activity;
