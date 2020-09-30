export class Application {
    id: number;
    fullName: string;
    dateOfBirth: string;
    highestQualification: string;
    marksObtained: number;
    goals: string;
    emailId: string;
    scheduledProgramId: string;
    status: string;
    dateOfInterview: string;
    constructor(id: number,
        fullName: string,
        dateofBirth:string,
        highestQualification: string,
        marksObstained: number,
        goals: string,
        emailId: string,
        scheduledProgramId: string,
        status: string,
        dateOfInterview: string) {
        this.id = id;
        this.dateOfBirth=dateofBirth;
        this.dateOfInterview=dateOfInterview;
        this.marksObtained=marksObstained;
        this.goals=goals;
        this.highestQualification=highestQualification;
        this.emailId=emailId;
        this.status=status;
        this.scheduledProgramId=scheduledProgramId;
        this.fullName=fullName;

    }
}