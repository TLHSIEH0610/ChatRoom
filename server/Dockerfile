FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app

# COPY "server.sln" "server.sln"
# COPY "server.csproj" "server.csproj"

COPY . .
RUN dotnet restore "server.sln"

COPY . .
WORKDIR /app
RUN dotnet publish -c Release -o out


# build a runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT [ "dotnet", "server.dll" ]