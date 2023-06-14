import React, { createContext, useContext, useState } from "react";
import { ChipsType } from "../compenents/SubjectsChip";

// Alias and Type Def

/**
 * @property selectedSubject - state holder for selected subject
 * @property setSelectedSubject
 */
interface ContextState {
  selectedSubject: {
    className: string;
    id: string;
    name: string;
    type: ChipsType;
  } | null;
  setSelectedSubject: (props: {
    className: string;
    id: string;
    name: string;
    type: ChipsType;
  }) => void;
}
//Alias and Types Def End

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

export default SubjectActivitiesContextProvider;
