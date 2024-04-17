import pg from "pg";

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

describe('JobsService', () => {
    let client: pg.Client;

    beforeEach(() => {
        client = new pg.Client();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('queryPinecone', () => {
        it('should get all jobs', async () => {
            const rows = [
                {"id": "0", "values": [0.1, 0.2, 0.3, 0.4, 0.5], "metadata": {"Titre du poste": "Software Developer", "Nom entreprise": "Google"}},
                {"id": "1", "values": [0.1, 0.3, 0.3, 0.7, 0.5], "metadata": {"Titre du poste": "Bûcheron", "Nom entreprise": "WoodenCo"}}];

            (client.query as jest.Mock).mockResolvedValueOnce({ rows });

            const result = await JobsService.getAllJobs();

            expect(result).toEqual(rows);
        });

        it('should find all the candidates who applied for the most similar jobs', async () => {

        });
    });

    describe('queryPostgre', () => {
        it('should get a specific jobs by its id', async () => {
            const rows = [
                {"id": "0", "title": "Software Developer", "description": "Code in Typescript", "company": "Google"},
                {"id": "1", "title": "Bûcheron", "description": "Coupe du bois", "company": "WoodenCo"}];

            (client.query as jest.Mock).mockResolvedValueOnce({ rows });

            const result = await JobsService.getJobById('1');

            expect(result).toEqual(rows[1]);
        });
    });
});