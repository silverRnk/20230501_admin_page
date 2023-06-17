import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFontAwesomeIconFromMIME, getSvgIconFromMIME } from "../../utils";
import FileIcon from "../SvgIcons/FileIcon";

const Container = styled.div`
  height: 75px;
  width: 300px;
  box-shadow: 0 0 5px gray;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 70px 1fr 40px;
`;

const IconWrapper = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    
    &>:first-child{
        font-size: 1.75rem;
        color: ${props => props.theme.colors.primary}
    }
    `;
const FileNameWrapper = styled.span`
  line-height: 75px;
  font-size: 1.15rem;
  font-weight: 500;
  letter-spacing: 0.1rem;
`;

const ButtonWrapper = styled.span``;
const DeleteButton = styled.button``;

const FileChip = (props: { file: File; onDelete?: () => void }) => {
  const { file, onDelete } = props;

  return (
    <Container>
      <IconWrapper>{getSvgIconFromMIME(file.type)}</IconWrapper>
      <FileNameWrapper>{file.name}</FileNameWrapper>
      <ButtonWrapper>
        <DeleteButton></DeleteButton>
      </ButtonWrapper>
    </Container>
  );
};

export default FileChip;
