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

- In `.env` file, fill 2 variables:

  - `DATABASE_URL=`: url link of postgresSQL(example: `DATABASE_URL=postgres://YourUserName:YourPassword@YourHostname:5432/YourDatabaseName`)

  - `PORT=`: your port server will run on, defalut is 8080

- This project using prisma to migrate and init database: (see <https://www.prisma.io/>)

  - To init your database run (make sure you already filled the `DATABASE_URL` variable in `.env` file):

  ```
  npx prisma migrate dev --name initdb
  ```

- Then install dependency

  ```
  npm i
  ```

- Start the server
  ```
  npm start
  ```

## APIs Usage

- All APIs are all defined in [This Json file](/api.json 'Database structure')
- Import this file to `POSTMAN` (More about `POSTMAN` see: <https://www.postman.com/>) to explore and try all the apis
- After import you wil see 3 folders
  - Admin: contains all APIs about admin
  - Company: contains all APIs about company
  - Employee: contains all APIs about employee
- Flow: system create company and admin's company &#8594; admin create employee of that company &#8594; employee can request for early salary
- WARNING:
  - Some APIs in `employee` you can not call immediately ([see here](#jwt-access-token))
  - If you don't use `8080` port , change the API URL replace `8080` to your port


### JWT ACCESS TOKEN
- Only real admin can `Create, Update, Delete` employee and only real employee can request money so we use JWT access token for authentication
- If the server return `"error": "Invalid token"` or `"error": "No token provided"` means that you must have access token to call this API, and you must fill the field `Authorization` in `Header`
- Get JWT access token:
  - Firstly you must have `user uuid` (is the `uuid` field that server return when you create admin or employee) to get JWT Token
  - Go to <https://jwt.io/>
  - Scrolldown to `Debugger`
  - Go to `Decoded` &#8594; `Payload`
  - Fill your `sub` field by your `uuid` (replace the `1234567890` default)
  - `iat` is time stamp when the token expired (enter the time in the future, example: `2516239022` is Sep 26 2049)
  - Now your Encoded is on your left
  - Your access token is: `Bearer`+ `<space>` + `Encoded`
  - Example your token will look like: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlYjBmYzk1NS1mMDhiLTRmYWQtODY3Yy01ZTJiNDk2ODQyNjQiLCJpYXQiOjI1MTYyMzkwMjJ9.bTDKP36wQLMkLqIz7Jsz1DuIibZDoE-84YtakZL8JfQ`
  - Now when you have access token, if you using `POSTMAN`, go to `Headers` tab, add key `Authorization` and the value is your access token
  - Note: Only token made by `admin` `uuid` can `Create, Update, Delete` employee and only token made by `employee` `uuid` can request money

## Addtional Information:

- DB design:
  ![Alt text](/db-structure.png 'Database structure')



- Get JWT example:
  ![Alt text](/getjwt.png 'Database structure')
