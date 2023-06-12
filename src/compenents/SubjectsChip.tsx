import React from "react";
import styled from "styled-components";
import { theme } from "../Theme";

const Container = styled.div<{ chipsType: ChipsType }>`
  height: 30px;
  width: 100px;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.15rem;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 1px -1px,
    rgba(0, 0, 0, 0.14) 0px 1px 1px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
  ${(props) =>
    props.chipsType === "BLUE"
      ? props.theme.chipStyles.chip1
      : props.chipsType === "YELLOW"
      ? props.theme.chipStyles.chip2
      : props.theme.chipStyles.chip3}

  &:active {
    filter: brightness(80%);
  }
`;

export type ChipsType = "BLUE" | "YELLOW" | "RED";

/**
 * @property name - text to be displayed
 * @property type - chip color BLUE | YELLOW | RED
 * @property onClick - event on click
 */
interface SubjectsChipProperties {
  name: string;
  type: ChipsType;
  onClick: () => void;
}

/**
 *
 * @param {SubjectsChipProperties} props -
 * @property name - text to be displayed
 * @property type - color of chips BLUE | YELLOW | GREEN
 * @property onClick - callback function when click
 *
 */
const SubjectsChip = (props: {
  name: string;
  type: ChipsType;
  onClick?: () => void;
}) => {
  const { name, type,onClick } = props;

  return <Container chipsType={type} onClick={onClick}>{name}</Container>;
};

export default SubjectsChip;
