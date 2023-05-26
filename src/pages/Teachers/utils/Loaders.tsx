import axiosClient from "../../../utils/AxiosClient";
import { GradeLevels, TeacherProfileShort } from "./interface";

export const loaderTeacherAll = async ({ params, request }) => {
  const url = new URL(request.url);
  const currentPage = Number(url.searchParams.get("page") || 1);

  const response = await axiosClient.get("/admin/teachers/all");
  const teachers: Array<TeacherProfileShort> =
    response?.data?.teachers ?? [];
  const gradeAndSections: Array<GradeLevels> =
    response?.data?.grade_levels ?? [];
  const pageCount = response?.data?.meta?.last_page ?? 1;

  return { teachers, gradeAndSections, currentPage, pageCount };
};

export const loaderTeacherAdd = async () => {
  const response = await axiosClient.get("/admin/grade_and_sections");
  const gradeAndSections: Array<GradeLevels> =
    response?.data?.grade_levels ?? [];

  return { gradeAndSections };
};

export const loaderTeacherProfile = async ({params, request}) => {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    const response = await axiosClient.get(`/admin/teachers/view/${id}`)

}
