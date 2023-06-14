import React, { useContext, useState, createContext } from "react";
import styled from "styled-components";
import ClassSubjectTable, {
  ClassSubjects, ClassSubjectsActivities,
} from "./ClassSubjectsTable";
import {
  SearchContainer,
  SearchOption,
  SearchSelection,
} from "../../../compenents/style-components/SearchInputComponents";
import SubjectsChip, {
  ChipsType,
} from "../../../compenents/SubjectsChip";
import SubjectActivitiesContextProvider, {
  useSubjectActivitiesContext,
} from "../../../context/SubjectActivitiesProvider";
import ActivitiesTable from "./ActivitiesTable";

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
  margin-bottom: 1em;
`;
//Styled-Components End

//Context Provider

//Component
const SubjectActivitiesPage = () => {
  const [classSubjectsActivities, setSubjectClassSubjectsActivities] = useState<
    Array<ClassSubjectsActivities>
  >([]);
  const classSubjects = classSubjectsActivities.map(classSubjAct => {
    return {className: classSubjAct.className,
       subjects: classSubjAct.subjects.map(subjectAct => {
        return {id: subjectAct.id, name: subjectAct.name} 
       })} as ClassSubjects
  })
  const [isLoading, setIsLoading] = useState(true);
  const { selectedSubject } = useSubjectActivitiesContext();
  const activitiesTableState = selectedSubject? "SELECTED" : "NO_SELECTED"
  
  
  const selectedSubjectActivities = classSubjectsActivities.filter(classSubjAct => {
    return selectedSubject?.className === classSubjAct.className
  })[0]?.subjects.filter(subject => {
    return subject.id === selectedSubject?.id
  })[0].activities ?? []

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
                selectedSubject && <SubjectsChip
                  name={selectedSubject?.name!}
                  type={selectedSubject?.type!}
                />
              }
            </SelectedSubject>
            <ActivitiesTable 
            activities={selectedSubjectActivities}
            state={activitiesTableState} />

          </ActivitiesWrapper>
        </>
      </SubjectActivitiesContextProvider>
    </Container>
  );
};

export default SubjectActivitiesPage;
