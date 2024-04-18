# CANDIDATE_FINDER_QUERY

## DESCRIPTION

This project is an implementation of the backend architecture called CQRS (Command Query Responsibility Segregation) and Event Sourcing. The project is a candidate finder system that allows users to search for candidates based on their skills and experience through vector similarity search. 
The COMMAND part writes candidates and jobs data into a PostgreSQL database, which is synced up with a Pinecone vector database. The QUERY part reads data from this vector database for efficiency purpose and for its semantics similarity search capabilities. The syncing between the PostgreSQL database and the Pinecone vector database is done using a python serverless function.

The COMMAND and QUERY parts are built with NodeJS and Express as independent microservices. The Serverless function is in python and is deployed using Azure Functions App timer trigger.
![Candidate_Finder_Architecture](https://github.com/paulpacaud/CANDIDATE_FINDER_QUERY/assets/85497912/c00dbde0-b0d9-4135-bdfb-5d2f2ce7cb01)


## Related repositories
CANDIDATE_FINDER_QUERY: https://github.com/paulpacaud/CANDIDATE_FINDER_QUERY

CANDIDATE_FINDER_COMMAND: https://github.com/WalidAstaoui/CANDIDATE_FINDER_COMMAND

CANDIDATE_FINDER_SERVERLESS_EMBEDDING: https://github.com/paulpacaud/CANDIDATE_FINDER_SERVERLESS_EMBEDDING

## Exemples de requêtes

## Recherche de candidats liés au mot clé de la recherche (comme pour une barre de recherche)
GET : http://localhost:8080/v1/candidates/

Exemple de corps de requête :

{"limit": 4, "page": 0, "search": "soft"}

## Recherche des informations complètes sur un candidat par son id
GET http://localhost:8080/v1/candidates/3

## Recherche des candidats les plus similaires à la description d'un poste
POST http://localhost:8080/v1/candidates/job-matching/

Exemple de corps de requête :

{
"job": {
"jobTitle": "Responsable Marketing",
"jobDescription": "Gérer la communication interne et externe de toute l'entreprise",
"jobCompany": "Google"
},
"numberOfCandidates": 2
}

## Recherche de jobs liés au mot clé de la recherche (comme pour une barre de recherche)
GET http://localhost:8080/v1/jobs/

Exemple de corps de requête :

{"limit": 4, "page": 0, "search": "soft"}

## Recherche des informations complètes sur un job par son id
GET http://localhost:8080/v1/jobs/5

## To start

> yarn install

> yarn watch




