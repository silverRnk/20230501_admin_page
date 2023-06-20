import React, { useState } from "react";
import { PageContainer } from "../../../compenents/style-components/PageStyleComponents";
import styled from "styled-components";
import { Button } from "../../../compenents/forms/Forms";
import ActivityInfo, { ActivityInformation } from "./ActivityInfo";
import ResourceLink, {
  ActivityResourceType,
} from "../../../compenents/ui/ResourceLink";
import ResourceList from "./ResourceList";
import { PlaceHolder } from "../../../compenents/style-components/StyleComponents";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

const Left = styled.div`
  flex: 1;
`;
const TitleWrapper = styled.div`
  margin-bottom: 25px;
`;
const Title = styled.h2`
  ${(props) => props.theme.fontThemes.h1}
`;
const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
  margin-bottom: 1em;
`;
const InfoWrapper = styled.div`
  margin-bottom: 1em;
`;
const FilesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Label = styled.span`
  font-weight: bold;
`;

const Right = styled.div`
  flex: 2.75;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
  height: 1000px;
`;

const Activity = () => {
  const [activityInfo, setActivityInfo] =
    useState<ActivityInformation | null>(null);
  const [files, setFiles] = useState<
    { type: ActivityResourceType; url: string; label?: string }[]
  >([]);
  return (
    <PageContainer>
      <Wrapper>
        <Left>
          <TitleWrapper>
            {activityInfo?.title !== undefined ? (
              <Title>{activityInfo?.title}</Title>
            ) : (
              <PlaceHolder />
            )}
          </TitleWrapper>

          <ButtonsWrapper>
            <Button>Edit</Button>
            <Button>Delete</Button>
          </ButtonsWrapper>
          <InfoWrapper>
            <ActivityInfo info={activityInfo} state="Loading" />
          </InfoWrapper>
          <FilesWrapper>
            <Label>Files</Label>
            <ResourceList resourceList={files} isLoading={true} />
          </FilesWrapper>
        </Left>
        <Right></Right>
      </Wrapper>
    </PageContainer>
  );
};

export default Activity;
