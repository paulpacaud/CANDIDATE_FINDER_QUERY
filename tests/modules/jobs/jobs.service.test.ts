import pg from "pg";
import CandidatesService from '../../../src/modules/candidates/candidates.service';
import dotenv from 'dotenv';
import OpenAiUtils from '../../../src/common/utils/openai.utils';
import { CandidateRepository } from '../../../src/common/repositories/candidates/CandidateRepository';
import JobsService from "../../../src/modules/jobs/jobs.service";
import {JobRepository} from "../../../src/common/repositories/jobs/JobRepository";

jest.mock('pg', () => {
    const mClient = {
        connect: jest.fn(),
        query: jest.fn(),
        end: jest.fn(),
    };
    return {
        Client: jest.fn(() => mClient),
    };
});
jest.mock('@pinecone-database/pinecone', () => {
    return {
        Pinecone: jest.fn().mockImplementation(() => ({
            index: jest.fn().mockReturnThis(),
            namespace: jest.fn().mockReturnThis(),
            query: jest.fn().mockResolvedValue({
                matches: [
                    {id: "0", metadata: {'Nom entreprise': "Google", 'Titre du poste': "Software Engineer"}},
                    {id: "1", metadata: {'Nom entreprise': "Carrefour", 'Titre du poste': "Vendeur"}}
                ]
            })
        }))
    };
});
jest.mock('../../../src/common/utils/openai.utils', () => ({
    createVectorEmbedding: jest.fn().mockResolvedValue([0.9, 0.8, 0.7])  // Simulating a vector embedding
}));

jest.mock('dotenv');
dotenv.config();

describe('JobsService', () => {
    describe('getAllJobVectors', () => {
        it('should get all jobs with pagination', async () => {
            const limit = 1;
            const page = 0;
            const search = "softwa";

            const result = await JobsService.getAllJobVectors(limit, page, search);

            const expectedJobs = [
                {jobCompany: "Google", jobTitle: "Software Engineer", id: "0"},
            ];

            expect(OpenAiUtils.createVectorEmbedding).toHaveBeenCalledWith(search);
            expect(result).toEqual(expectedJobs);
        });
    });

    describe('getJobById', () => {
        let client: pg.Client;

        beforeEach(() => {
            client = new pg.Client();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should get a specific job by its id', async () => {
            const rows = [
                {jobCompany: "Google", jobTitle: "Software Engineer", id: "0", jobDescription: "Code in Typescript"},
                {jobCompany: "Carrefour", jobTitle: "Vendeur", id: "1", jobDescription: "Vente en rayon"}
            ];

            (client.query as jest.Mock).mockResolvedValueOnce({ rows });

            const result = await JobsService.getJobById('1');

            expect(result).toEqual(rows[1]);
            // Surprisingly, the test does not pass and the query returns the first candidate instead of the third one, while it works with postman outside of the tests
            // it indicates that the mock or the test is not properly done..
        });
    });

});