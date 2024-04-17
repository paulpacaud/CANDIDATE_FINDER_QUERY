export interface Job {
    jobTitle: string;
    jobDescription: string;
    jobCompany: string;
}

export interface JobQuery {
    job: Job;
    numberOfCandidates: number;
}

export interface JobVector {
    jobTitle: string;
    jobCompany: string;
    id: string;
}