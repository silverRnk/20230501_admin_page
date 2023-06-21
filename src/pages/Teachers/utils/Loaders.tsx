import axiosClient from "../../../utils/AxiosClient";
import {
  AllTeachersSearchParams,
  GradeLevels,
  TeacherProfileShort,
} from "./interface";

/**
 * Get request to BASE_URL + /api//admin/teachers/all
 * @param args
 * @returns
 */
export const loaderTeacherAll = async (args: {
  params?: Record<AllTeachersSearchParams, string | number | null>;
  request?: any;
}) => {
  const { params, request } = args;

  const response = await axiosClient.get("/admin/teachers/all", {
    
  });
  console.log(params);
  const teachers: Array<TeacherProfileShort> =
    response?.data?.data?.teachers ?? [];
  const gradeAndSections: Array<GradeLevels> =
    response?.data?.data?.grade_levels ?? [];
  const pageCount = response?.data?.meta?.last_page ?? 1;
  const currentPage = response?.data?.meta?.last_page ?? 1;

  return { teachers, gradeAndSections, pageCount, currentPage };
};

export const loaderTeacherAdd = async () => {
  const response = await axiosClient.get("/admin/grade_and_sections");
  const gradeAndSections: Array<GradeLevels> =
    response?.data?.grade_levels ?? [];

  return { gradeAndSections };
};

export const loaderTeacherProfile = async ({ params, request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const response = await axiosClient.get(
    `/admin/teachers/view/${id}`
  );
};
