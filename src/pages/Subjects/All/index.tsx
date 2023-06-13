import React, { createRef, useState } from "react";
//types & interface
import { Subject } from "../utils/interfaces";

//tyle-components
import styled from "styled-components";

//Mui Imports
import { Pagination } from "@mui/material";
import SubjectsTable from "./SubjectsTable";
import { SearchInput, SearchSelection, ButtonSearch as SearchButton } from "../../../compenents/style-components/SearchInputComponents";

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
const Title = styled.h1`
  ${props => props.theme.fontThemes.h2}
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

const InputName = styled(SearchInput)`
  
`;
const Selection = styled(SearchSelection)`
  
`;

const SelectionItem = styled.option``;

const ButtonSearch = styled(SearchButton)`
`;

const PagerContainer = styled.div`
  height: 100px;
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;

const AllSubjects = () => {
  const gradeLevelRef = createRef<HTMLSelectElement>();
  const sectionRef = createRef<HTMLSelectElement>();
  const [searchName, setSearchName] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pageCount = 1;
  const currentPage = 1;
  const [data, setData] = useState<Array<Subject>>([])

  const handleOnRowsPerChange = (e) => {
    console.log(e.targe.value);
  };

  const handlerSearch = async () => {
    // if (searchName === "" && className === "") {
    //   setData(studentList2);
    // } else if (searchName === "" && className !== "") {
    //   setData(
    //     studentList2.filter((student) => {
    //       return className === student.std_c_name;
    //     })
    //   );
    // } else if (searchName !== "" && className === "") {
    //   setData(
    //     studentList2.filter((student) => {
    //       return student.std_name.match(`.*${searchName}.*`);
    //     })
    //   );
    // } else {
    //   setData(
    //     data.filter((student) => {
    //       return (
    //         studentList2.std_name.match(`.*${searchName}.*`) &&
    //         className === student.std_c_name
    //       );
    //     })
    //   );
    // }
    // setSearchName("");
    // setClassName("");
  };

  const handlePressEnter = (event) => {
    if (event.which === 13) {
      handlerSearch();
    }
  };

  const handlerSearchName = (e) => {
    setSearchName(e.target.value);
    console.log(e.target.value);
  };

  const handleClassName = (e) => {
    // setClassName(e.target.value);
    // console.log("grade id", e.target.value);
    // const selSection =
    //   gradeAndSection.filter((grade) => {
    //     return grade.grade_level_id === e.target.value;
    //   })[0].sections ?? [];
    // setSectionList(selSection);
  };

  const handlerTableRow = (event, student) => {
    // setSelectedStudent(student);
    // setOpen(true);
    // console.log(student);
    // navigate(`/students/student?id=${student.std_id}`);
  };

  const handlePageClick = (e, value: number) => {
    // navigate(`/students/all?page=${value}`);
  };

  return (
    <Container onKeyDownCapture={handlePressEnter}>
      <Title>All Subjects</Title>
      <SearchContainer>
        <InputName
          placeholder="Search by Name"
          onInput={handlerSearchName}
        />

        <Selection
          placeholder="Select Class"
          ref={gradeLevelRef}
          onInput={handleClassName}
        >
          <SelectionItem value={""}> Select Class </SelectionItem>
        </Selection>
        <Selection ref={sectionRef}>
          <SelectionItem value={""}> Select Section </SelectionItem>
        </Selection>
        <ButtonSearch onClick={handlerSearch}>Search</ButtonSearch>
      </SearchContainer>
      <SubjectsTable data={data} isLoading={isLoading} />
      <PagerContainer>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageClick}
        />
        {/* <TablePagination
          component="div"
          rowsPerPageOptions={[10]}
          count={data.length}
          rowsPerPage={rowPerPage}
          page={page}
          onPageChange={handleOnPageChange}
          onRowsPerPageChange={handleOnRowsPerChange}
          style={{ display: "flex", alignItems: "center" }}
        /> */}
      </PagerContainer>
    </Container>
  );
};

export default AllSubjects;
