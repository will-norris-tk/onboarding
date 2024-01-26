# Recipe Management API

This project provides an API for managing recipes. It allows users to perform various operations such as creating, retrieving, updating, and deleting recipes.

## Local Development

Local development can be done with or without the use of devcontainers.

### With Devcontainers

This project includes the config required to develop using devcontainers. Just install the Devcontainers plugin in VSCode and then open the project with it.

1. Run migrations to set up the DB

    ```bash
    make migrate
    ```

2. To run tests:

    ```bash
    make test
    ```

3. To run the app and expose it on port 8000 (default) on your machine so you can interact with the API etc:

    ```bash
    make server
    ```

4. The API will be available at `http://localhost:8000/api/recipes/`.

### Without Devcontainers

This project includes the a Dockerfile and a docker-compose to let you run the app if you don't like using devcontainers.

1. Build the app container:

    ```bash
    docker-compose build app
    ```

2. Get a shell in the container:

    ```bash
    docker-compose run app
    ```

3. Run migrations to set up the DB

    ```bash
    make migrate
    ```

4. To run tests:

    ```bash
    make test
    ```

5. To run the app and expose it on port 8000 (default) on your machine so you can interact with the API:

    ```bash
    make server
    ```

6. The API will be available at `http://localhost:8000/api/recipes/`.