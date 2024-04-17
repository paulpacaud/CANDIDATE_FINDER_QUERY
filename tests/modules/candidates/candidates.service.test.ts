import pg from "pg";
import CandidatesService from "../../../src/modules/candidates/candidates.service";

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

describe('CandidatesService', () => {
    let client: pg.Client;

    beforeEach(() => {
        client = new pg.Client();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('queryPinecone', () => {
        it('should get all candidates', async () => {
            const rows = [
                {"id": "0", "values": [0.1, 0.2, 0.3, 0.4, 0.5], "metadata": {"Nom": "Paul Doe"}},
                {"id": "1", "values": [0.1, 0.3, 0.3, 0.7, 0.5], "metadata": {"Nom": "Robert Home"}}];

            (client.query as jest.Mock).mockResolvedValueOnce({ rows });

            const result = await CandidatesService.getAllCandidates();

            expect(result).toEqual(rows);
        });



        it('should find the best candidates for a job', async () => {
            const rows = [
                {"id": "0", "values": [0.1, 0.2, 0.3, 0.4, 0.5], "metadata": {"Nom": "Paul Doe"}},
                {"id": "1", "values": [0.1, 0.3, 0.3, 0.7, 0.5], "metadata": {"Nom": "Robert Home"}}];

            (client.query as jest.Mock).mockResolvedValueOnce({ rows });

            const result = await CandidatesService.findBestCandidatesForJob(
                {jobTitle: "Software Engineer", jobDescription: "Code in Typescript", jobCompany: "Google"},
                1
                );

            expect(result).toEqual(rows[1]);
        });

        it('should find all the candidates who applied for a job', async () => {

        });
    });

    describe('queryPostgre', () => {
        it('should get a specific candidate by its id', async () => {
            const rows = [
                {"id": "0", "values": [0.1, 0.2, 0.3, 0.4, 0.5], "metadata": {"Nom": "Paul Doe"}},
                {"id": "1", "values": [0.1, 0.3, 0.3, 0.7, 0.5], "metadata": {"Nom": "Robert Home"}}];

            (client.query as jest.Mock).mockResolvedValueOnce({ rows });

            const result = await CandidatesService.getCandidateById('1');

            expect(result).toEqual(rows[1]);
        });
    });
});