import React, { memo } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getFontAwesomeIconFromMIME,
  getSvgIconFromMIME,
} from "../../utils";

import CloseIcon from "@mui/icons-material/Close";
const Container = styled.div`
  height: 75px;
  width: 300px;
  background-color: white;
  box-shadow: 0 0 5px gray;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 70px 1fr 40px;
  
  /* transition: all 0.25s ease; */
  
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  & > :first-child {
    font-size: 1.75rem;
    color: ${(props) => props.theme.colors.primary};
  }
`;
const FileNameWrapper = styled.span`
  display: flex;
  align-items: center;
  margin: 5px;
  font-size: 1.15rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: underline;
  color: blue;
  letter-spacing: 0.1rem;
  cursor: pointer;
`;

const ButtonWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const DeleteButton = styled.button`
  all: unset;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  transition: all 0.25s ease;
  
  &:hover{
    background-color: lightblue;
  }
`;

const FileChip = (props: { file: File; onDelete?: () => void }) => {
  const { file, onDelete } = props;

  const handleClick = () => {
    const url = URL.createObjectURL(file)
    window.open(url, "_blank")
    URL.revokeObjectURL(url)
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(onDelete !== undefined){
      onDelete()
    }
    
  }
  return (
    <Container >
      <IconWrapper onClick={handleClick}>{getSvgIconFromMIME(file.type)}</IconWrapper>
      <FileNameWrapper onClick={handleClick}>{file.name}</FileNameWrapper>
      <ButtonWrapper>
        <DeleteButton onClick={handleDelete} ><CloseIcon/></DeleteButton>
      </ButtonWrapper>
    </Container>
  );
};

export default memo(FileChip);
