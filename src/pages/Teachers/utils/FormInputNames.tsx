import { FormInputLabel } from "./interface";

type TeacherInputs = 'first_name'
         | 'last_name'
         | 'gender' 
         | 'dob'
         | 'religion'
         | 'email'
         | 'phone'
         | 'password'
         | 'password_conf'
         | 'profile_img'



export const AddTeacherLabels: Record<TeacherInputs, FormInputLabel> = {
    first_name: {label: 'First Name', name: 'first_name', isRequired: true},
    last_name: {label: 'Last Name', name: 'last_name', isRequired: true},
    gender: {label: 'Gender', name: 'gender', isRequired: true},
    dob: {label: 'Date of Birth', name: 'date_of_birth', isRequired: true},
    religion: {label: 'Religion', name: 'religion', isRequired: false},
    email: {label: 'Email', name: 'email', isRequired: true},
    phone: {label: 'Phone Number', name: 'phone', isRequired: true},
    password: {label: 'Password', name: 'password', isRequired: true},
    password_conf: {label: 'Password Confirmation', name: 'password_confirmation', isRequired: true},
    profile_img: {label: 'Profile Image', name: 'profile_img', isRequired: false},


}