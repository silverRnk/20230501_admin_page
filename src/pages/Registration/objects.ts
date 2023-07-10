import { FormInputLabel } from "../../utils/interfaces";

type AddStudentInput = 'std_first_name'
         | 'std_last_name'
         | 'std_gender' 
         | 'std_dob'
         | 'std_religion'
         | 'std_email'
         | 'std_phone'
         | 'std_grade'
         | 'std_section'
         | 'std_password'
         | 'std_passconf'
         | 'std_photo'
         | 'enrollee_type'
         | 'fth_name'
         | 'fth_name'
         | 'mth_name'
         | 'mth_occupation'
         | 'fth_occupation'
         | 'prn_religion'
         | 'prn_email'
         | 'prn_phone'
         | 'address'
         | 'place_of_birth'
         | 'prev_school'


export const AddStudentLabels: Record<Exclude<AddStudentInput, 'std_photo'>, FormInputLabel> = {
    std_first_name: {label: 'First Name', name: 'std_first_name'},
    std_last_name: {label: 'Last Name', name: 'std_last_name'},
    std_gender: {label: 'Gender', name: 'std_gender'},
    std_dob: {label: 'Date of Birth', name: 'std_date_of_birth'},
    std_religion: {label: 'Religion', name: 'std_religion'},
    std_email: {label: 'Email', name: 'std_email'},
    std_phone: {label: 'Phone Number', name: 'std_phone'},
    std_password: {label: 'Password', name: 'std_password'},
    std_passconf: {label: 'Confirm Password', name: 'std_password_confirmation'},
    std_grade: {label: 'Grade', name: 'std_grade'},
    std_section: {label: 'Section', name: 'std_section'},
    enrollee_type: {label: 'Enrollee Type', name: 'enrollee_type'},
    // std_photo: {label: 'Profile Image', name: 'std_photo'},
    fth_name: {label: "Father\'s Name", name:'fathers_name'},
    mth_name: {label: "Mother\'s Name", name: 'mothers_name'},
    fth_occupation: {label: "Father\'s Occupation", name: 'fathers_occupation'},
    mth_occupation:{label:"Mother\'s Occupation",name: "mothers_occupation"},
    prn_religion: {label: "Guardian\'s Religion", name: 'parents_religion'},
    prn_email: {label: "Guardian\'s Email", name: 'parents_email'},
    prn_phone: {label: "Guardian\'s Phone No.", name: 'parents_phone'},
    address: {label: 'Address', name: 'address'},
    place_of_birth: {label: 'Place of Birth', name: 'place_of_birth'},
    prev_school:{label: 'Previous School', name:'prev_school'}
}