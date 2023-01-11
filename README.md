# Project Highlights
This project is a test for Zuju gaming backend job

Scope:
- Use NodeJs with TypeScript
- Use 'typeorm' to work with MySQL
- Use 'swagger-ui-express' to show API endpoints
- Use 'jest' to run unit tests and integration test

To make this project simple clean, I decide to **NOT IMPLEMENT** basic features as list below (without scope):
- Authentication and authorization
- Eslint
- Docker
  
If you want to add above features or others, let make request for next meeting

# Build And Deployment

Please open your terminal and run below command
```shell
npm install
```
This package-lock.json is generated for Linux Environment. 

If you have trouble when build (ie for MacOS), please remove package-lock.json file and run above command again

# Configure environment variables

Create .env file by copying example file

```shell
cp .env.example .env
```

Then modify environment variables in this file, most variables related to database config

```shell
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_USERNAME=test
DB_PASSWORD=test
DB_NAME=test
```

# Running
Please open your terminal and run below
```shell
npm run start
```
If you can not start because used port, please try other port like something
```shell
PORT=5000 npm start
```

# Testing

I make config to use in-memory sqlite for testing. That mean no need to config test database.

Please open your terminal and run below command
```shell
npm run test
```
If you want to test only 1 test, please run
```shell
npm run test src/test/fixture/fixture.integration.test.ts
```
Wait some minutes for testing completed, Jest will give you a summary test result
# Show API endpoints
Please run application first (npm run start)

After that visit below link on your browser (Chrome, Firefox)


http://localhost:3000/api-docs

Swagger UI will give you guidelines to use my endpoints


