
import axiosClient from "../utils/AxiosClient"
import {studentList} from "../utils/data"


export const loadStudents = async ({params, request}) => {
    // let data, studens, pageCount
    const url = new URL(request.url)
    const currentPage = Number(url.searchParams.get('page') || 1);

    
    // const students = studentList
    // const pagerLinks = []
    const data = await axiosClient.get(`/admin/allStudents?page=${currentPage}`) ?? {}
    if(data.status === 401){
        throw new Response('Unauthorized', 401)
    }


    const students = data?.data?.data ?? []
    const pageCount = data?.data?.meta?.last_page ?? 1
    const gradeAndSection = data?.data?.grade_levels ?? []
    console.log('grade and section', gradeAndSection)
    console.log('lastPage',data?.data?.meta.last_page);

    return {students, gradeAndSection, currentPage, pageCount}

}

export const loadStudentData = async ({params, request}) => {
    console.log("params",params)
    const url = new URL(request.url)
    const name = url.searchParams.get("name")
    console.log("url", url)
    console.log("name", name)

    return {}
}

export const loadPath = ({request}) => {
    console.log(request)

    return {}
}