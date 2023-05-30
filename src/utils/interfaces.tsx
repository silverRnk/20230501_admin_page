export interface FormValidationFeedback {
    message: string,
    isInvalid: boolean,
    isVisible: boolean
}

export interface Grade {
    subject: string,
    q1?: number,
    q2?: number,
    q3?: number,
    q4?: number
}

export interface GradesPerSY {
    year: number,
    grades: Array<Grade>
}