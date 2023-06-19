import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  TableBody,
  TablePagination,
  Pagination,
} from "@mui/material";
import React, {
  useState,
  useCallback,
  useEffect,
  createRef,
} from "react";
import styled from "styled-components";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";

import { loaderTeacherAll } from "../utils/Loaders";
import { Section } from "../../Students/utils/interface";
import {
  SearchInput,
  SearchSelection,
  ButtonSearch as SearchButton,
} from "../../../compenents/style-components/SearchInputComponents";
import TeachersTable from "./TeachersTable";
import { GradeLevels } from "../utils/interface";
import { TeacherProfileShort } from "../utils/interface";
import axios from "axios";
import { URLSearchParams } from "url";

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
const Title = styled.h2`
  ${(props) => props.theme.fontThemes.h2}
  text-align: left;
  width: 100%;
  margin-bottom: 40px;
`;

const SearchContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 0.75fr 0.75fr 0.5fr;
  grid-template-rows: 75px;
  gap: 30px;
  margin-bottom: 50px;
`;

const InputName = styled(SearchInput)``;
const Selection = styled(SearchSelection)``;

const SelectionItem = styled.option``;

const ButtonSearch = styled(SearchButton)``;

const PagerContainer = styled.div`
  height: 100px;
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;
 

function AllTeachers() {
  const nameRef = createRef<HTMLInputElement>();
  const gradeLevelRef = createRef<HTMLSelectElement>();
  const sectionRef = createRef<HTMLSelectElement>();
  const [sectionList, setSectionList] = useState<Array<Section>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const [gradeAndSections, setGradeAndSections] = useState<
    Array<GradeLevels>
  >([]);
  const [teachers, setTeachers] = useState<
    Array<TeacherProfileShort>
  >([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [urlParams] = useSearchParams()
  const nameParams = urlParams.get('name')
  const gradeLevelParams = urlParams.get('grade_level')
  const sectionParams = urlParams.get('section')
  console.log('params', nameParams, gradeLevelParams, sectionParams)
  useEffect(() => {
    setIsLoading(true)
    loaderTeacherAll({
      params: {
        page: currentPage,
        gradeLevel: gradeLevelParams,
        name: nameParams,
        section: sectionParams,
      },
    }).then(res => {
      setTeachers(res.teachers)
      setPageCount(res.pageCount)
      setGradeAndSections(res.gradeAndSections)
      setIsLoading(false)
    }).
    catch(err => {
      console.log(err)
    });
  }, [currentPage, nameParams, gradeLevelParams, sectionParams]);

  const handlerSearch = async () => {
    const searchParams = `name=${nameRef.current?.value}&`
        + `grade_level=${gradeLevelRef.current?.value}&`
        + `section=${sectionRef.current?.value}`

    console.log(searchParams)
    navigate(`/teachers/all?` + searchParams )
  };

  const handleSelectClass = (e) => {
    const selSection =
      gradeAndSections.filter((grade) => {
        return grade.grade_level_id === e.target.value;
      })[0].sections ?? [];
    setSectionList(selSection);
  };

  const handleSelectRow = (event, teacher:TeacherProfileShort) => {
    navigate(`/teachers/teacher?id=${teacher.teacher_id}`);
  };

  const handlePageChange = (e, value: number) => {
    setCurrentPage(value)
  };

  return (
    <Container>
      <Title>All Teachers</Title>
      <SearchContainer>
        <InputName ref={nameRef} placeholder="Search by Name" />

        <Selection
          placeholder="Select Class"
          ref={gradeLevelRef}
          onInput={handleSelectClass}
        >
          <SelectionItem value={""}> Select Class </SelectionItem>
          {gradeAndSections.map((item) => (
            <SelectionItem value={item.grade_level_id}>
              {item.grade_level}
            </SelectionItem>
          ))}
        </Selection>
        <Selection ref={sectionRef}>
          <SelectionItem value={""}> Select Section </SelectionItem>
          {sectionList.map((section) => (
            <SelectionItem value={section.id}>
              {section.section_name}
            </SelectionItem>
          ))}
        </Selection>
        <ButtonSearch onClick={handlerSearch}>Search</ButtonSearch>
      </SearchContainer>

      <TeachersTable
        data={teachers}
        isLoading={isLoading}
        onSelectRow={handleSelectRow}
      />

      <PagerContainer>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
        />
      </PagerContainer>
    </Container>
  );
}

export default AllTeachers;
