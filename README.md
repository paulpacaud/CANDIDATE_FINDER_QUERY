# CANDIDATE_FINDER_QUERY

## DESCRIPTION

This project is an implementation of the backend architecture called CQRS (Command Query Responsibility Segregation) and Event Sourcing. The project is a candidate finder system that allows users to search for candidates based on their skills and experience through vector similarity search. 
The COMMAND part writes candidates and jobs data into a PostgreSQL database, which is synced up with a Pinecone vector database. The QUERY part reads data from this vector database for efficiency purpose and for its semantics similarity search capabilities.

The COMMAND and QUERY parts are built with NodeJS and Express, and deployed on 
The project is implemented using NodeJS and Express for the COMMAND and QUERY parts, and python serverless functions for the event sourcing syncing up the two databases.

