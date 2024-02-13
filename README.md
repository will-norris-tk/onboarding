# Recipe Management App

This project consists of a backend (django) and frontend (react) app. Each piece is split into its own directory. Each directory contains a separate docker-compose file if you want to run either piece in isolation (although the frontend relies on there being some form of backend running at the expected url).

## Running locally

To start up both services just run:
```
docker-compose up 
```

You will be able to access the frontend application at: http://localhost:3000

Backend api docs can be viewed at: http://localhost:8000/api/recipes/
