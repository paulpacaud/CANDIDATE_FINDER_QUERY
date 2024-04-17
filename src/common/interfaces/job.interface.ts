export interface Job {
    jobTitle: string;
    jobDescription: string;
    jobCompany: string;
}

export interface JobQuery {
    job: Job;
    numberOfCandidates: number;
}