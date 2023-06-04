import React, { memo } from "react";
import styled, { css } from "styled-components";
import { PlaceHolderStyle } from "./style-components/StyleComponents";
import DefaultImage from "../assets/profile_default.svg";

const Image = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.colors.background};
`;

const LoadingImg = styled.div`
  ${PlaceHolderStyle}
  width: 300px;
  height: 300px;
  border-radius: 50%;
  margin-bottom: 20px;
  background-size: 700px 700px !important;
`;

const ProfileImg = (arg: { image: string; isLoading: boolean }) => {
  const { image, isLoading } = arg;

  return isLoading ? (
    <LoadingImg />
  ) : (
    <Image src={image || DefaultImage} />
  );
};

export default memo(ProfileImg);
