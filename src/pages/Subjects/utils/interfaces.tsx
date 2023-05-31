export interface Subject {
    subject_id: string
    subject: string
    teachers: Array<{
        teacher_id: string, 
        teacher: string,
        classes: Array<{class: string, schedule: string}>}>
}

