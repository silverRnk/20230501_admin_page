import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 175px;
  height: 175px;
  background-color: red;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 0 10px gray;
  padding: 10px;
  display: flex;
`;

const CardFilter = styled.div<{disabled:boolean}>`
  height: 100%;
  width: 100%;
  opacity: ${props => props.disabled? '0':'1'};
  position: absolute;
  background-color: gray;
  border-radius: 10px;
`;

const Title = styled.label`
    
`

const FileUploadCard = () => {
  return (
    <Card>
      <CardFilter disabled/>
      <CardFilter disabled/>

    </Card>
  );
};

export default FileUploadCard;
