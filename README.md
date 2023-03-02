# adventure-flow-be

## Required to install
- Node
- MySQL

## Installation

1. Clone git repo `https://github.com/Jeffsingh/adventure-flow-be.git`
2. Run `npm install command` 
3. Change db config in `adventure-flow-be/config/config.json`
4. Run `npx sequelize db:create` to create database
5. Run `npx sequelize db:migrate` to add all tables and relations
6. Run `npx sequelize-cli db:seed:all` to add test data
7. Create .env file and add SEKRET_KEY and OPENAI_API_KEY variables
8. Run `node index.js` to start app