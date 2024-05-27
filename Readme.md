# TypeScript Project with Express, Prisma, and Winston

This project is an example of setting up a Node.js server using TypeScript, Express, Prisma ORM for interacting with a MySQL database, and Winston for logging.

## Project Structure

```
    src/
    ├── controllers/
    │ ├── UserController.ts
    │ ├── CreateController.ts
    ├── routes/
    │ ├── index.ts
    ├── prisma/
    │ ├── schema.prisma
    │ ├── generated/
    │   ├── client/
    ├── logger.ts
    ├── server.ts
```

## Prerequisites

- Node.js (version 14 or higher)
- MySQL

## Setup

### 1. Clone the Repository

```
git clone <REPOSITORY_URL>
cd <REPOSITORY_NAME>
```

# Install Dependencies
``npm install``

# 3. Configure Environment Variables
   Create a .env file in the project root and add the environment variable for the database URL:

env
Copy code
DATABASE_URL=mysql://root@127.0.0.1:3306/tsStudyDbPrism
# 4. Configure Prisma
``npx generate prisma``

# 5. Run Migrations
``npm run migrate``


# List Users
``GET /api/users``
# Create Users
`` Post /api/create-user``

