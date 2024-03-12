# Architecture Refactoring Helper

The Architecture Refactoring Helper is a web-based application that guides an architectural refactoring of monolithic applications towards microservices. Based on a repository of scientific publications, it helps in finding approaches for the automated decomposition into services. As well, it supports the design of a microservices architecture based on established patterns and best practices. The migration process consists of three phases and is guided by predefined quality goals identified during an initial scenario-based architecture evaluation.

## Running the Application in Docker

### Requirements

- Docker
- Docker-compose

### Starting the Application

1. Navigate to "{RepositoryFolder}" via Console
2. Run "docker-compose build" (only needed on first startup or if code changed were made)
3. Run "docker-compose up"

### Using the Application

After starting the docker containers, the API can be reached at:
- "https://localhost:8080/api/v1" or 
- "https://localhost:5000/api/v1" 

The user interface at:
- "https://localhost:8080/" or
- "https://localhost:9000/"

### Troubleshooting

It might be necessary to change the API production URL inside the UI project.
This can be done in the file "{RepositoryFolder}/UI/src/environments/environment.prod.ts".

### Data Seeding

The application's database can be seeded on application start by providing prepared data sets in the folder
"ArchitectureRefactoringHelper\Repository\DatabaseSeedingData".

## Running the Application Back-End

### Requirements

- [.NET 6 SDK](https://dotnet.microsoft.com/en-us/download/dotnet) - if running without Docker
- Docker - if running in Docker

### Starting the Application

- Running through IDE
    1. Open "ArchitectureRefactoringHelper.sln" in "{RepositoryFolder}/ArchitectureRefactoringHelper" Folder
    2. Run "Repository" Project
- Running through Console
    1. Navigate to "{RepositoryFolder}/ArchitectureRefactoringHelper/Repository"
    2. On first startup run "dotnet restore"
    3. Run "dotnet run"
- Running in Docker container
    1. Navigate to "{RepositoryFolder}/ArchitectureRefactoringHelper/Repository"
    2. Run "docker build -t {ImageTag} ."
    3. Run "docker run -p 5000:5000 {ImageTag}"

### Using the Application

#### Without Docker
After starting, the app the API will be running on:
- "https://localhost:7262/api/v1" 

The swagger UI can be reached at:
- "https://localhost:7262/swagger/index.html"

#### With Docker
After starting the docker container, the API can reached at:
- "https://localhost:8080/api/v1" or 
- "https://localhost:5000/api/v1" 

The Swagger UI is not active when running the application in docker.

## Running the Application Front-End (UI)

### Requirements

- [node.js](https://nodejs.org/en/download) - if running without Docker
- [Angular CLI](https://angular.io/cli) - if running without Docker
- Docker - if running in Docker

### Starting the Application

- Running through WebStorm
    1. Open "{RepositoryFolder}/UI" Folder
    2. Run application
- Running through Console
    1. Navigate to "{RepositoryFolder}/UI"
    2. On first startup run "npm install"
    3. Run "ng serve"
- Running in Docker container
    1. Navigate to "{RepositoryFolder}/UI"
    2. Run "docker build -t {ImageTag} ."
    3. Run "docker run -p 9000:9000 {ImageTag}"

### Using the Application

#### Without Docker
After starting the app the user interface can be reached on:
- "https://localhost:4200"

#### With Docker
After starting docker container the user interface can be reached at:
- "http://localhost:8080/" or
- "http://localhost:9000/"

## Development

### Using ng-openapi-gen

The [ng-openapi-gen](https://github.com/cyclosproject/ng-openapi-gen) NPM module enables us to generate angular services and models based on a OpenApi 3 specification.
As an input, it takes either the swagger.json file in the "{RepositoryFolder}/Repository" folder.

For more info see: https://github.com/cyclosproject/ng-openapi-gen

#### Generating Angular Services and Models

- Open console of choice
- Navigate to "{RepositoryFolder}/UI"
- Run "npm run openapi-gen"

#### Re-generating the swagger.json File for the API

The swagger.json will be generated at each startup of the application back-end.
This is not the case when using the existing dockerfiles.
