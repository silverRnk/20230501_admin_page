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
import { studentList, studentList2 } from "../../../utils/data";
import ViewProfile from "../../../compenents/ViewProfile";
import {  useLoaderData, useNavigate } from "react-router-dom";
import { columnAllStudents } from "../utils/ColumnLabels";


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



const AddTeacher = () => {
  return (
    <div></div>
  )
}

export default AddTeacher