# Architecture Refactoring Helper

The Architecture Refactoring Helper is an application which aims to help find suitable migration approaches to microservices architecture.

## Running the application

### Backend

#### Requirements

- .NET 6 SDK (https://dotnet.microsoft.com/en-us/download/dotnet)

#### Starting the application

1. Running through IDE
    - Open 'ArchitectureRefactoringHelper.sln' in '{RepositoryFolder}/ArchitectureRefactoringHelper' Folder
    - Run 'Repository' Project
2. Running through CLI
    - Navigate to '{RepositoryFolder}/ArchitectureRefactoringHelper/Repository'
    - On first startup run 'dotnet restore'
    - Run 'dotnet run'

#### Using the application

After starting the app the API will run on 'https://localhost:7262/api/v1' and the swagger UI can be reached at 'https://localhost:7262/swagger/index.html'

### User interface

### Requirements

- node.js
- Angular CLI

#### Starting the application

1. Running through WebStorm
    - Open Folder 'UI' in the repository´
    - Run application 
2. Running through CLI
    - Navigate to '{RepositoryFolder}/UI'
    - On first startup run 'npm install'
    - Run 'ng serve'

#### Using the application

After starting the app the user interface can be reached on 'https://localhost:4200'

## Data model

The data model behind this application is modeled in the following Entity-Relationship-Dragram:

![Data model](Docs/data-model.png)

TODO
