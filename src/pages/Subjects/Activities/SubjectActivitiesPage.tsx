import React, { useContext, useState, createContext } from "react";
import styled from "styled-components";
import ClassSubjectTable, {
  ClassSubjects,
} from "../../../compenents/ClassSubjectsTable";
import {
  SearchContainer,
  SearchOption,
  SearchSelection,
} from "../../../compenents/style-components/SearchInputComponents";
import { ChipsType } from "../../../compenents/SubjectsChip";

//Styled-Components
const Container = styled.div`
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
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  display: block;
  ${(props) => props.theme.fontThemes.h2}
  text-align: left;
  width: 100%;
  margin-right: auto;
`;

const ActivitiesWrapper = styled.div`
  margin-top: 50px;
  width: 100%;
`;

const SelectedSubject = styled.div`
  width: 100%;
  ${(props) => props.theme.fontThemes.h4}
`;
//Styled-Components End

// Alias and Type Def

/**
 * @property selectedSubject - state holder for selected subject
 * @property setSelectedSubject
 */
interface ContextState {
  selectedSubject: { name: string; type: ChipsType } | null;
  setSelectedSubject: (props: {
    name: string;
    type: ChipsType;
  }) => void;
}
//Alias and Types Def End

//Context Provider
// Init State
const initState: ContextState = {
  selectedSubject: null,
  setSelectedSubject: (props: {
    name: string;
    type: ChipsType;
  }) => {},
};

const SubjectActivityContext =
  createContext<typeof initState>(initState);

/**
 * 
 * Context Provider
 */
const SubjectActivitiesContextProvider = (props: {
  children: React.JSX.Element;
}) => {
  const [selectedSubject, _setSelectedSubject] = useState<{
    name: string;
    type: ChipsType;
  } | null>(null);

  const setSelectedSubject = (props: {
    name: string;
    type: ChipsType;
  }) => {
    const { name, type } = props;
    _setSelectedSubject({ name, type });
  };

  return (
    <SubjectActivityContext.Provider
      value={{ selectedSubject, setSelectedSubject }}
    >
      {props.children}
    </SubjectActivityContext.Provider>
  );
};

/**
 * Provides the state for Subject Activities Page
 * @return {{name:string, type:ChipsType}} selectedSubjects
 * @return setSelectedSubject
 */
export const useSubjectActivitiesContext = () =>
  useContext(SubjectActivityContext);
//Context Provider End

//Component
const SubjectActivitiesPage = () => {
  const [classSubjects, setSubjectClassSubjects] = useState<
    Array<ClassSubjects>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Container>
      <Header>
        <Title>Subject Activities</Title>
        <SearchSelection style={{ width: "300px" }}>
          <SearchOption>-- Select Year --</SearchOption>
        </SearchSelection>
      </Header>
      <SubjectActivitiesContextProvider>
        <>
          <ClassSubjectTable
            classSubjects={classSubjects}
            isLoading={isLoading}
            schoolYear={2020}
          />

          <ActivitiesWrapper>
            <SelectedSubject>
              Subject:{" "}
              {
                //TODO ADD SelectedSubject Chip
              }
            </SelectedSubject>
          </ActivitiesWrapper>
        </>
      </SubjectActivitiesContextProvider>
    </Container>
  );
};

export default SubjectActivitiesPage;
