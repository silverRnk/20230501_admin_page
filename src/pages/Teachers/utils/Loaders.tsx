import { GradeLevels, TeacherProfileShort } from "./interface";

export const loaderTeacherAll = ({params, request}) => {
    
    const teachers: Array<TeacherProfileShort> = [];
    const gradeAndSections: Array<GradeLevels> = []
    const currentPage = 1;
    const pageCount = 1;


    return  {teachers, gradeAndSections, currentPage, pageCount} 
}