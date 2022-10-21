# Salary-hero

One of the missions of Salary Hero is to improve the financial wellness of workers in Thailand. Many times there can be an expectedly urgent situation where one really needs to use the money. Instead of waiting until the end of the month for his salary, the worker can make a request to Salary Hero!

## Technical Specifications

- Express
- PostgreSQL
- Node.js
- Prisma
- JWT

## Prerequisites

- NodeJS v16.15.1 (latest LTS at current version of Charizard), if you have `nvm` installed, inside the directory, just `nvm install` to install and active corresponding NodeJS version
- IDE: Visual Studio Code, with `markdownlint`, `EditorConfig for VS Code`, `ESLint` plugins installed

## Environment Setup

- Create `.env` file
- In `.env` file, create 2 variables:
  - `DATABASE_URL=`: url link of postgresSQL(example: `DATABASE_URL=postgres://YourUserName:YourPassword@YourHostname:5432/YourDatabaseName`)
  - `PORT=`: your port server will run on, defalut is 8080
- This project using prisma to migrate and init database: (see <https://www.prisma.io/>)

  - To init your database run (make sure you have filled the `DATABASE_URL` variables in `.env` file):

  ```
  npx prisma migrate dev --name initdb
  ```

- Then install dependency

  ```
  npm i
  ```

- Start the project
  ```
  npm start
  ```

## APIs Usage

- All APIs are all defined in  [This Json file](/api.json 'Database structure')
- Import this file to `POSTMAN` (if you don't know what is `POSTMAN` see: <https://www.postman.com/>) to explore and try all the apis
- If you don't use `8080` port , change the API URL replace `8080` to your port

## JWT ACCESS TOKEN

- Only real admin can `Create, Update, Delete` employee and only real employee can request money so we use JWT access token for authentication
- If the server return `"error": "Invalid token"` or `"error": "No token provided"` means that you must have access token to all this API, and you must fill the field `Authorization` in `Header`
- Firist you must have `user uuid` (the `uuid` field server return when you create admin or employee) to get JWT Token
- Get JWT access token:
  - Go to <https://jwt.io/>
  - Scrolldown to Debugger
  - At Decoded go to -> Payload
  - Fill your `sub` field by your `uuid`
  - `iat` is time stamp when the token expired
  - Now your Encoded is on your left
  - Your access token is: `Bearer `+ `<space>` + `Encoded`
  - Example your token will look like: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.L8i6g3PfcHlioHCCPURC9pmXT7gdJpx3kOoyAfNUwCc`
  - Now when you have access token, if you using `POSTMAN`, go to `Headers` tab add key `Authorization` and the value is your access token
  - Note: Only token made by `admin` `uuid` can `Create, Update, Delete` employee and only token made by `employee` `uuid` can request money

## Addtional Information:

- DB design:
  ![Alt text](/db-structure.png 'Database structure')
