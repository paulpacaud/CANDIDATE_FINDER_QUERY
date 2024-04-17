import pg from "pg";
import CandidatesService from '../../../src/modules/candidates/candidates.service';
import dotenv from 'dotenv';
import OpenAiUtils from '../../../src/common/utils/openai.utils';
import { CandidateRepository } from '../../../src/common/repositories/candidates/CandidateRepository';

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
                    {id: "0", metadata: {Nom: "Paul Doe"}},
                    {id: "1", metadata: {Nom: "Robert Home"}}
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

describe('CandidatesService', () => {
    describe('findBestCandidatesForJob', () => {
        it('should find the best candidates for a job', async () => {
            const job = {jobTitle: "Software Engineer", jobDescription: "Code in Typescript", jobCompany: "Google"};
            const numberOfCandidates = 2;

            const result = await CandidatesService.findBestCandidatesForJob(job, numberOfCandidates);

            const expectedCandidates = [
                {name: "Paul Doe", id: "0"},
                {name: "Robert Home", id: "1"}
            ];

            expect(OpenAiUtils.createVectorEmbedding).toHaveBeenCalledWith(job.jobDescription);
            expect(result).toEqual(expectedCandidates);
        });
    });

    describe('getAllCandidateVectors', () => {
        it('should get all candidates with pagination', async () => {
            const limit = 1;
            const page = 0;
            const search = "softwa";

            const result = await CandidatesService.getAllCandidateVectors(limit, page, search);

            const expectedCandidates = [
                {name: "Paul Doe", id: "0"}
            ];

            expect(OpenAiUtils.createVectorEmbedding).toHaveBeenCalledWith(search);
            expect(result).toEqual(expectedCandidates);
        });
    });

    describe('getCandidateById', () => {
        let client: pg.Client;

        beforeEach(() => {
            client = new pg.Client();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should get a specific candidate by its id', async () => {
            const rows = [
                {
                    "id": 1,
                    "name": "Jules Ferris",
                    "email": "jules.ferris@hotmail.com",
                    "phone": "0624429669",
                    "cv": "Test"
                },
                {
                    "id": 2,
                    "name": "Aurélien Dupuis",
                    "email": "aurelien.dupuis@gmail.com",
                    "phone": "0712742278",
                    "cv": "Compétences: Développement Full-Stack, JavaScript, Python, Java, SQL, NoSQL. Langues: Français - Anglais. Éducation: Master en Informatique, Université de Paris. Expérience: 5 ans en tant que développeur full-stack chez TechCompany. Projets: Développement d'une application web pour la gestion de projets, création d'une base de données pour un site e-commerce. Certifications: Certification Oracle Certified Professional, Java SE 8 Programmer."
                },
                {
                    "id": 3,
                    "name": "Léonard Beaumont",
                    "email": "leonard.beaumont@gmail.com",
                    "phone": "0756789123",
                    "cv": "Compétences: Développement Front-End, React, Vue.js, HTML, CSS, JavaScript. Langues: Français - Anglais - Espagnol. Éducation: Licence en Informatique, Université de Lyon. Expérience: 3 ans en tant que développeur front-end chez WebCompany. Projets: Développement d'une application web pour la gestion de tâches, création d'un site web pour une entreprise de mode. Certifications: Certification Google Mobile Web Specialist."
                }
            ];

            (client.query as jest.Mock).mockResolvedValueOnce({ rows });

            const result = await CandidatesService.getCandidateById('3');
            expect(client.query).toBeCalledWith("SELECT * FROM candidates WHERE id = 3");
            expect(result).toEqual(rows[2]);
            // Surprisingly, the test does not pass and the query returns the first candidate instead of the third one, while it works with postman outside of the tests
            // it indicates that the mock or the test is not properly done..
        });
    });

    describe('getCandidatesWhoAppliedForSimilarJob', () => {
        it('should find all the candidates who applied for the most similar jobs', async () => {
            // Not implemented yet, not enough time
        });
    });
});