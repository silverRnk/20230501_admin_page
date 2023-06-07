import React, { createRef, useLayoutEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  ChatBubble as MessageIcon,
  PriorityHigh as AlertIcon,
  CheckCircleOutline as SuccessIcon,
} from "@mui/icons-material";
const Container = styled.div<{
  open: boolean;
  isExpanded: boolean;
  expandedHeight?: number;
}>`
  height: ${(props) =>
    props.isExpanded ? `${props.expandedHeight}px` : "130px"};
  min-height: 130px;
  overflow: hidden;
  width: 350px;
  display: ${(props) => (props.open ? "grid" : "none")};
  grid-template-rows: 30px 1fr;
  position: relative;
  background-color: white;
  box-shadow: 2px 2px 5px gray;
  border-radius: 5px;
  z-index: 2;
  transition: height 0.5s ease-in-out;
`;

const HeaderBar = styled.div<{ messageType: MessageType }>`
  height: 35px;
  background-color: ${(props) =>
    props.messageType === "Message"
      ? props.theme.colors.primary
      : props.messageType === "Successful"
      ? props.theme.colors.secondary
      : "red"};
  color: white;
  border-radius: 5px 5px 0px 0px;
  display: grid;
  grid-template-columns: 1fr 30px 30px;
  gap: 5px;
  padding: 0 15px;
  font-size: 1.25rem;
  line-height: 35px;
  letter-spacing: 0.1em;
`;

const IconButton = styled.div<{ isExpanded?: boolean }>`
  height: 25px;
  width: 25px;
  padding: 0;
  align-self: center;
  justify-self: center;
  line-height: 25px;
  text-align: center;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.5s ease-in-out;
  transform: ${(props) =>
    props.isExpanded ? "rotate(-180deg)" : "rotate(0deg)"};
  &:hover {
    background-color: #e1e1e133;
    filter: brightness(80%);
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 5px;
  padding: 5px;
`;
const Left = styled.div`
  margin-top: 15px;
  max-height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: self-start;
`;

const IconContainer = styled.div<{ messageType: MessageType }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.messageType === "Message"
      ? props.theme.colors.primary
      : props.messageType === "Successful"
      ? props.theme.colors.secondary
      : "red"};
  &:first-child {
    font-size: 1.75rem !important;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * @type   Message | Successful | Error
 */
type MessageType = "Message" | "Successful" | "Error";

const PopupDialog = (
  args: {
    open: boolean;
    messageType: MessageType;
    onTimeOut: () => void;
    message: string;
  },
  duration: number = 1500
) => {
  const { open, onTimeOut, message, messageType } = args;
  const [isExpand, setIsExpand] = useState(false);
  setTimeout(() => {
    onTimeOut();
  }, duration);
  const messageRef = createRef<HTMLDivElement>();
  const [clientHeight, setClientHeight] = useState(0);

  useLayoutEffect(() => {
    setClientHeight(messageRef.current?.clientHeight!);
  }, []);

  const handlerExpandDialog = () => {
    setIsExpand(!isExpand);
  };


  return (
    <Container
      id="time-limited-dialog"
      open={open}
      isExpanded={isExpand}
      expandedHeight={40 + clientHeight}
    >
      <HeaderBar messageType={messageType}>
        {messageType}
        <IconButton
          isExpanded={isExpand}
          role="button"
          onClick={handlerExpandDialog}
        >
          <KeyboardArrowDownIcon style={{ fontSize: "25px" }} />
        </IconButton>
        <IconButton role="button">
          <CloseIcon style={{ fontSize: "25px" }} />
        </IconButton>
      </HeaderBar>

      <Content>
        <Left>
          <IconContainer messageType={messageType}>
            {messageType === "Message" ? (
              <MessageIcon />
            ) : messageType === "Successful" ? (
              <SuccessIcon />
            ) : (
              <AlertIcon />
            )}
          </IconContainer>
        </Left>
        <Right ref={messageRef} className="message">
          {message}
        </Right>
      </Content>
    </Container>
  );
};

export default PopupDialog;
