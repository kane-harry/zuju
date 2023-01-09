# Project Highlights
This project is a test for Zuju gaming backend job

Scope:
- NodeJs with TypeScript
- Use MySQL as database
- Use 'swagger-ui-express' to show API endpoints
- Use 'jest' to run unit tests and integration test

To make this project simple clean, I decide to **NOT IMPLEMENT** basic features as list below (without scope):
- Authentication and authorization
- Eslint
- Docker
- DotEnv
  
If you want to add above features or others, let make request for next meeting

#Build and Deployment
Please open your terminal and run below command
```shell
npm install && npm run build
```
This package-lock.json is generated for Linux Environment. 

If you have trouble when build (ie for MacOS), please remove package-lock.json file and run above command again

# Running
Please open your terminal and run below
```shell
npm run start
```
If you can not start because used port, please run try other port like something
```shell
PORT=5000 npm start
```

#Testing
Please open your terminal and run below command
```shell
npm run test
```
If you want to test only 1 test, please run
```shell
npm run test {path to specific test file}
```
Wait some mins for testing completed, Jest will give you a summary test result
# Show API endpoints
Please run application first (npm run start)
After that visit below link on your browser (Chrome, Firefox)


http://localhost:3000/api-docs

Swagger UI will give you guidelines to use my endpoints

