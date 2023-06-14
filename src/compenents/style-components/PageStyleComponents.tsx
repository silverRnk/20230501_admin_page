import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  height: 1000px;
  border-radius: 10px;
  box-shadow: 0 0 7px lightgray;
  background-color: white;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-shadow: 0px 0px 5px gray;
`;

export const PageTitle = styled.h1`
  width: 100%;
  ${(props) => props.theme.fontThemes.h2}
  margin-bottom: 40px;
`;