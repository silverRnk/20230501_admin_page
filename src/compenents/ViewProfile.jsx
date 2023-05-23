import React from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import DefaultImg from "../assets/profile_default.svg";

const Container = styled.dialog`
  width: 70vw;
  height: 800px;
  position: absolute;
  border: 1px solid black;
  margin: auto auto;
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  padding: 20px;
  z-index: 2;
`;

const Top = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  border: none;
  background-color: transparent;
`;

const ProfileContainer = styled.div`
  flex: 8;
  display: grid;
  grid-template-columns: 3fr 5fr;
`;

const ImageContainer = styled.div`
  height: auto;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 50%;
`;

const InfoContainer = styled.div`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
`;

const Name = styled.h1``;

const StudentDesc = styled.p``;

const InfoList = styled.table`
    height: 80%`;

const InfoItem = styled.tr`
    `;
const InfoTitle = styled.th``;
const InfoDesc = styled.td` `;

const ViewProfile = ({
  open,
  onClose,
  std_id,
  std_name,
  std_gender,
  std_c_name,
  std_parent_name,
  std_address,
  std_dob,
  std_phone_no,
  std_img,
}) => {
  return (
    <Container open={open}>
      <Top>
        <Logo>LOGO</Logo>
        <CloseButton onClick={() => onClose()}>
          <CloseIcon />
        </CloseButton>
      </Top>
      <ProfileContainer>
        <ImageContainer>
          <Image
            src={std_img || DefaultImg}
            style={{ border: std_img ? "none" : "1px solid black" }}
          />
        </ImageContainer>
        <InfoContainer>
          <Name>{std_name || ""}</Name>
          <StudentDesc></StudentDesc>
          <InfoList>
            <InfoItem>
              <InfoTitle>ID Number:</InfoTitle>
              <InfoDesc>{std_id}</InfoDesc>
            </InfoItem>
            <InfoItem>
              <InfoTitle>Name:</InfoTitle>
              <InfoDesc>{std_name}</InfoDesc>
            </InfoItem>
            <InfoItem>
              <InfoTitle>Gender:</InfoTitle>
              <InfoDesc>{std_gender}</InfoDesc>
            </InfoItem>
            <InfoItem>
              <InfoTitle>Class:</InfoTitle>
              <InfoDesc>{std_c_name}</InfoDesc>
            </InfoItem>
            <InfoItem>
              <InfoTitle>Parent:</InfoTitle>
              <InfoDesc>{std_parent_name}</InfoDesc>
            </InfoItem>
            <InfoItem>
              <InfoTitle>Address:</InfoTitle>
              <InfoDesc>{std_address}</InfoDesc>
            </InfoItem>
            <InfoItem>
              <InfoTitle>Date of Birth:</InfoTitle>
              <InfoDesc>{std_dob}</InfoDesc>
            </InfoItem>
            <InfoItem>
              <InfoTitle>Phone:</InfoTitle>
              <InfoDesc>{std_phone_no}</InfoDesc>
            </InfoItem>
          </InfoList>
        </InfoContainer>
      </ProfileContainer>
    </Container>
  );
};

export default ViewProfile;
