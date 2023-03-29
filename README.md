# adventure-flow-be

## Required to install
- Node
- MySQL

## Installation

1. Clone git repo `https://github.com/Jeffsingh/adventure-flow-be.git`
2. Run `npm install command` 
3. Add db credentials in .env `DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST`
4. Run `npx sequelize db:create` to create database
5. Run `npx sequelize db:migrate` to add all tables and relations
6. Run `npx sequelize-cli db:seed:all` to add test data
7. Create .env file and add `OPENAI_API_KEY`, `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`, `GOOGLE_OAUTH_REDIRECT` variables
8. Run `node index.js` to start app