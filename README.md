# CANDIDATE_FINDER_QUERY

## DESCRIPTION

This project is an implementation of the backend architecture called CQRS (Command Query Responsibility Segregation) and Event Sourcing. The project is a candidate finder system that allows users to search for candidates based on their skills and experience through vector similarity search. 
The COMMAND part writes candidates and jobs data into a PostgreSQL database, which is synced up with a Pinecone vector database. The QUERY part reads data from this vector database for efficiency purpose and for its semantics similarity search capabilities. The syncing between the PostgreSQL database and the Pinecone vector database is done using a python serverless function.

The COMMAND and QUERY parts are built with NodeJS and Express, and deployed on Azure App Services as independent microservices. The Serverless function is deployed using Azure Functions App.
![Candidate_Finder_Architecture](https://github.com/paulpacaud/CANDIDATE_FINDER_QUERY/assets/85497912/c00dbde0-b0d9-4135-bdfb-5d2f2ce7cb01)


## Related repositories
CANDIDATE_FINDER_QUERY: https://github.com/paulpacaud/CANDIDATE_FINDER_QUERY

CANDIDATE_FINDER_COMMAND: https://github.com/WalidAstaoui/CANDIDATE_FINDER_COMMAND

CANDIDATE_FINDER_SERVERLESS_EMBEDDING: https://github.com/paulpacaud/CANDIDATE_FINDER_SERVERLESS_EMBEDDING

## To start

> yarn install
> yarn watch




