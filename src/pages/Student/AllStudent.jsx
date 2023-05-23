import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  TableBody,
  TablePagination,
  Pagination
} from "@mui/material";
import React, { useState, useCallback, useEffect, createRef } from "react";
import styled from "styled-components";
import { studentList, studentList2 } from "../../utils/data";
import "./style.css";
import ViewProfile from "../../compenents/ViewProfile";
import {  useLoaderData, useNavigate } from "react-router-dom";
import { columnAllStudents } from "./utils/ColumnLabels";


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

const InputName = styled.input`
  background-color: #f0f1f3;
  border: none;
  border-radius: 10px;
  color: gray;
  padding: 10px;
  font-size: 1.25rem;
`;
const Selection = styled.select`
  background-color: #f0f1f3;
  border: none;
  border-radius: 10px;
  color: gray;
  padding: 10px;
  padding-right: 20px;
  font-size: 1.25rem;
`;

const SelectionItem = styled.option``;

const ButtonSearch = styled.button`
  font-size: 1.25rem;
  color: white;
  background-color: red;
  border: none;
  border-radius: 10px;

  &:hover {
    background-color: #d00000;
  }
`;

const PagerContainer = styled.div`
  height: 100px;
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;


const AllStudent = () => {
  const column = columnAllStudents;
  const gradeLevelRef = createRef();
  const sectionRef = createRef();
  const [searchName, setSearchName] = useState("");
  const [className, setClassName] = useState("");
  const [sectionList, setSectionList] = useState([]);
  const [page, setPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  
  const [selectedStudent, setSelectedStudent] = useState(null);
  /**
   * @type {{import("./utils/interface").StudentProfileShort,
   * import("./utils/interface").GradeLevels, number, number}}
   */
  const { students, gradeAndSection , currentPage, pageCount } = useLoaderData();
  const navigate = useNavigate()
  const data = students


  const handleOnPageChange = useCallback(
    (event, newPage) => {
      setPage(newPage);
    },
    [rowPerPage, page]
  );

  const handleOnRowsPerChange = (e) => {
    console.log(e.targe.value);
  };

  const handlerSearch = async () => {
    if (searchName === "" && className === "") {
      setData(studentList2);
    } else if (searchName === "" && className !== "") {
      setData(
        studentList2.filter((student) => {
          return className === student.std_c_name;
        })
      );
    } else if (searchName !== "" && className === "") {
      setData(
        studentList2.filter((student) => {
          return student.std_name.match(`.*${searchName}.*`);
        })
      );
    } else {
      setData(
        data.filter((student) => {
          return (
            studentList2.std_name.match(`.*${searchName}.*`) &&
            className === student.std_c_name
          );
        })
      );
    }
    setSearchName("");
    setClassName("");
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
    setClassName(e.target.value);
    console.log('grade id', e.target.value)
    const selSection = gradeAndSection.filter(grade => {
      return grade.grade_level_id === e.target.value})[0].sections ?? []
    setSectionList(selSection)
  };

  const handlerTableRow = (event, student) => {
    // setSelectedStudent(student);
    // setOpen(true);
    console.log(student);
    navigate(`/students/view_profile?id=${student.std_id}`)

  };

  const handlerCloseDialog = () => {
    setOpen(false);
    setSelectedStudent(null);
    console.log("close");
  };

  const handlePageClick = (e, value) => {
    navigate(`/students/all?page=${value}`)
  }

  return (
    <Container onKeyDownCapture={handlePressEnter}>
      <Title>All Students</Title>
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
          <SelectionItem  value={""}> Select Class </SelectionItem>
          {gradeAndSection.map((item) => (
            <SelectionItem value={item.grade_level_id}>{item.grade_level}</SelectionItem>
          ))}
        </Selection>
        <Selection
          ref={sectionRef}>
          <SelectionItem value={''}> Select Section </SelectionItem>
          {sectionList.map(section => (
            <SelectionItem value = {section.id}>{section.name}</SelectionItem>
          ))}
        </Selection>
        <ButtonSearch onClick={handlerSearch}>Search</ButtonSearch>
      </SearchContainer>
      <TableContainer
        component={Paper}
        sx={{
          border: "1px solid black",
          width: "100%",
        }}
      >
        <Table size="medium">
          <TableHead>
            {column.map((col) => {
              return (
                <TableCell
                  key={col.id}
                  style={{ minWidth: col.minWidth }}
                >
                  {col.label}
                </TableCell>
              );
            })}
          </TableHead>
          <TableBody>
            {students
              .map((student) => (
                <TableRow
                  className="table-body-row"
                  hover
                  onClick={(event) => {
                    handlerTableRow(event, student)
                  }}
                  key={student.id}
                  style={{ cursor: "pointer" }}
                >
                  {column.map((col) => {
                      let value;
                    if (col.id === "birth_date") {
                      value = student[col.id].toLocaleDateString();
                    } else {
                      value = student[col.id];
                    }

                    return (
                      <TableCell size="medium">
                        {value || "N/A"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PagerContainer>
        <Pagination count={pageCount} page={currentPage} onChange={handlePageClick} />
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

      <ViewProfile
        open={open}
        onClose={handlerCloseDialog}
        {...selectedStudent}
      />
    </Container>
  );
};

export default AllStudent;
