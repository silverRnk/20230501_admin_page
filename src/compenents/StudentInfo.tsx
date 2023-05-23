import React from 'react'
import styled from 'styled-components';
import { StudentProfileLong } from '../pages/Student/utils/interface';

const InfoContainer = styled.div`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
`;
const InfoList = styled.table`
  height: 80%;
`;
const InfoItem = styled.tr``;
const InfoTitle = styled.th``;
const InfoDesc = styled.td``;

const StudentInfo = (studentProfile?: StudentProfileLong) => {
  return (
    <InfoContainer>
            <InfoList>
              <tbody>
                <InfoItem>
                  <InfoTitle>ID Number:</InfoTitle>
                  <InfoDesc>
                    {studentProfile?.id_number || "N/A"}
                  </InfoDesc>
                </InfoItem>
                <InfoItem>
                  <InfoTitle>Name:</InfoTitle>
                  <InfoDesc>
                    {studentProfile?.father_name || "N/A"}
                  </InfoDesc>
                </InfoItem>
                <InfoItem>
                  <InfoTitle>Gender:</InfoTitle>
                  <InfoDesc>
                    {studentProfile?.gender || "N/A"}
                  </InfoDesc>
                </InfoItem>
                <InfoItem>
                  <InfoTitle>Class:</InfoTitle>
                  <InfoDesc>
                    {studentProfile?.class || "N/A"}
                  </InfoDesc>
                </InfoItem>
                <InfoItem>
                  <InfoTitle>Parent:</InfoTitle>
                  <InfoDesc>
                    {studentProfile?.mother_name || "N/A"}
                  </InfoDesc>
                </InfoItem>
                <InfoItem>
                  <InfoTitle>Address:</InfoTitle>
                  <InfoDesc>
                    {studentProfile?.father_occupation || "N/A"}
                  </InfoDesc>
                </InfoItem>
                <InfoItem>
                  <InfoTitle>Date of Birth:</InfoTitle>
                  <InfoDesc>
                    {studentProfile?.date_of_birth || "N/A"}
                  </InfoDesc>
                </InfoItem>
                <InfoItem>
                  <InfoTitle>Phone:</InfoTitle>
                  <InfoDesc>
                    {studentProfile?.class || "N/A"}
                  </InfoDesc>
                </InfoItem>
              </tbody>
            </InfoList>
          </InfoContainer>
  )
}

export default StudentInfo