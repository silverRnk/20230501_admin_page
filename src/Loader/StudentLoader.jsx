
import axiosClient from "../utils/AxiosClient"
import {studentList} from "../utils/data"


export const loadStudents = async ({params, request}) => {

    const url = new URL(request.url)
    const currentPage = Number(url.searchParams.get('page') || 1);

    const data = await axiosClient.get(`/admin/allStudents?page=${currentPage}`) ?? {}
    if(data.status === 401){
        throw new Response('Unauthorized', 401)
    }

    const students = data?.data?.data ?? []
    const pageCount = data?.data?.meta?.last_page ?? 1
    const gradeAndSection = data?.data?.grade_levels ?? []

    return {students, gradeAndSection, currentPage, pageCount}

}

export const loadStudentData = async ({params, request}) => {
    console.log("params",params)
    const url = new URL(request.url)
    const id = url.searchParams.get("id")


    
    const response = await axiosClient.get(`/admin/student/${id}`) ?? {}
    if(response.status === 401){
        throw new Response('Unauthorize', 401)
    }


    const studentInfo = response?.data?.data?.[0] ?? {}
    const gradeLevels = response?.data?.grade_levels ?? []

    return {studentInfo, gradeLevels}
}

export const loadPath = ({request}) => {
    console.log(request)

    return {}
}