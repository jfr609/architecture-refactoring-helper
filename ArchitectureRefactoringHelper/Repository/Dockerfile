FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Repository/Repository.csproj", "Repository/"]
RUN dotnet restore "Repository/Repository.csproj"
COPY . .
WORKDIR "/src/Repository"
RUN dotnet build "Repository.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Repository.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Repository.dll"]
