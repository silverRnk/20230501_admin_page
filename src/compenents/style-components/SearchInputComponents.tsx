import styled from 'styled-components'

export const SearchContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 0.75fr 0.75fr 0.5fr;
  grid-template-rows: 75px;
  gap: 30px;
  margin-bottom: 50px;
`;

export const SearchInput = styled.input`
  background-color: #f0f1f3;
  border: none;
  border-radius: 10px;
  color: gray;
  padding: 10px;
  font-size: 1.25rem;
`;
export const SelectionSelection = styled.select`
  /* -webkit-appearance: none;
  -moz-appearance: none; */
  background-color: #f0f1f3;
  border: none;
  border-radius: 10px;
  color: gray;
  padding: 10px;
  padding-right: 20px;
  font-size: 1.25rem;

  ::after {
    content: 'Hello';}
`;

export const SearchOption = styled.option``;

export const ButtonSearch = styled.button`
  font-size: 1.25rem;
  color: white;
  background-color: red;
  border: none;
  border-radius: 10px;

  &:hover {
    background-color: #d00000;
  }
`;