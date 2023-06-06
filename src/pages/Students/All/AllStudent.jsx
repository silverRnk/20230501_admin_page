import { Pagination } from "@mui/material";
import React, {
  useState,
  useCallback,
  useEffect,
  createRef,
} from "react";
import styled from "styled-components";
import { studentList, studentList2 } from "../../../utils/data";

import {
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { columnAllStudents } from "../utils/ColumnLabels";
import {
  ButtonSearch as SearchButton,
  SearchInput,
  SearchOption,
  SearchSelection,
} from "../../../compenents/style-components/SearchInputComponents";
import StudentsTable from "../../../compenents/StudentsTable";
import axiosClient from "../../../utils/AxiosClient";

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
  box-shadow: 0px 0px 5px gray;
`;
const Title = styled.h1`
  width: 100%;
  ${(props) => props.theme.fontThemes.h2}
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

const SelectionItem = styled(SearchOption)``;

const ButtonSearch = styled(SearchButton)``;

const PagerContainer = styled.div`
  height: 100px;
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;

const AllStudent = () => {
  const nameRef = createRef();
  const gradeLevelRef = createRef();
  const sectionRef = createRef();
  const [gradeAndSection, setGradeAndSection] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams()
  const nameParams = searchParams.get('name')
  const gradeLevelParams = searchParams.get('grade_level')
  const sectionParams = searchParams.get('section')


  useEffect(() => {
    setIsLoading(true);
    axiosClient
      .get(`/admin/allStudents`, {
        params:{
          page:page,
          name:nameParams,
          grade_level:gradeLevelParams,
          section:sectionParams
        }
      })
      .then((res) => {
        const data = res ?? {};
        setStudents(data?.data?.data ?? []);
        setPageCount(data?.data?.meta?.last_page ?? 1);
        setGradeAndSection(data?.data?.grade_levels ?? []);
        
        setIsLoading(false);
        
      })
      .catch((err) => {
        console.log("Error", err);
        if (err.status === 401) {
          throw new Response("Unauthorized", 401);
        }
      });

  }, [page]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  //Search Function
  const handlerSearch = async () => {
    const searchParams = new URLSearchParams({
      name: nameRef.current?.value,
      grade_level: gradeLevelRef.current?.value,
      section: sectionRef.current?.value,
    });

    if(!nameRef.current?.value && !gradeLevelRef.current?.value && !sectionRef.current?.value){
      navigate('/students/all?')
      return
    }

    navigate('/students/all?' + searchParams.toString())
  };

  const handlePressEnter = (event) => {
    if (event.which === 13) {
      handlerSearch();
    }
  };

  const handleClassName = (e) => {
    sectionRef.current.value = "";
    const selSection =
      gradeAndSection.filter((grade) => {
        return grade.grade_level_id === e.target.value;
      })[0].sections ?? [];

    setSectionList(selSection);
  };

  const handlerTableRow = useCallback((event, student) => {
    navigate(`/students/student?id=${student.std_id}`);
  }, students);

  return (
    <Container onKeyDownCapture={handlePressEnter}>
      <Title>All Students</Title>
      <SearchContainer>
        <InputName ref={nameRef} placeholder="Search by Name" />

        <Selection
          placeholder="Select Class"
          ref={gradeLevelRef}
          onInput={handleClassName}
        >
          <SelectionItem value={""}> Select Class </SelectionItem>
          {gradeAndSection.map((item) => (
            <SelectionItem value={item.grade_level_id}>
              {item.grade_level}
            </SelectionItem>
          ))}
        </Selection>
        <Selection ref={sectionRef}>
          <SelectionItem value={""}> Select Section </SelectionItem>
          {sectionList.map((section) => (
            <SelectionItem value={section.id}>
              {section.name}
            </SelectionItem>
          ))}
        </Selection>
        <ButtonSearch onClick={handlerSearch}>Search</ButtonSearch>
      </SearchContainer>

      <StudentsTable
        data={students}
        isLoading={isLoading}
        onSelectRow={handlerTableRow}
      />

      <PagerContainer>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
        />
      </PagerContainer>
    </Container>
  );
};

export default AllStudent;
