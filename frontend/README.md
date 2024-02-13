# Recipe Management App Frontend

This is the frontend for the recipe management app. Created using 'create-react-app'.

## Running locally

To start the server just run
```
docker-compose up
```
And then navigate to http://localhost:3000 to see the running app. Note: You will need to point the app at a backend providing the expected responses otherwise you will just see empty pages / will not be able to create new recipes etc.

## Running Tests
Get a shell in a docker container
```
docker-compose run app sh
```
Run tests
```
npm test
```