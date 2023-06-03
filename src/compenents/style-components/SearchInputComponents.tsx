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
  background-color: ${props => props.theme.colors.background2};
  border: none;
  border-radius: 10px;
  color: gray;
  padding: 10px;
  font-size: 1.25rem;

  &:focus{
    background-color: white;
    color: black;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary};
  }
`;
export const SearchSelection = styled.select`
  /* -webkit-appearance: none;
  -moz-appearance: none; */
  background-color: ${props => props.theme.colors.background2};
  border: none;
  border-radius: 10px;
  color: gray;
  padding: 10px;
  padding-right: 20px;
  font-size: 1.25rem;

  &:focus{
    background-color: white;
    color: black;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary};
  }
`;

export const SearchOption = styled.option``;

export const ButtonSearch = styled.button`
  font-size: 1.25rem;
  color: white;
  text-shadow: 0px 0px 3px lightgray;
  background-color: ${props => props.theme.colors.secondary};
  border: none;
  border-radius: 10px;

  &:active{
    filter: brightness(80%);
    color: gray;
  }
`;