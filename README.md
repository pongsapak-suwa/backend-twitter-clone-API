# Backend test project

simple Twitter clone API built with Node.js, Express, and MongoDB. This project allows users to register, log in, tweet messages, and follow other users. JWT (JSON Web Token) is used for authentication.

## Features

- User can register with username and password.
- API will require JWT token to authorize.
- User can tweet a message which no longer than 200 characters.
- User can follow other user and the message from other user will be included in the user’s feed with the latest time ordered.

## Endpoints

| Endpoint                | Description                               |
| ----------------------- | ----------------------------------------- |
| **User**                |                                           |
| /auth/register          | Register the new user                     |
| /auth/login             | Login                                     |
| /auth/logout            | Logout                                    |
| /api/follow/[user_id]   | Follow other user                         |
| /api/unfollow/[user_id] | Unfollow a user                           |
| **Feed**                |                                           |
| /api/feed               | Get the message feed for the current user |
| /api/tweet              | Create new tweet                          |

* Details api endpoints to see more aftre run and see to http://localhost:8080/api-docs/

## Prerequisites

- Node.js: Version 14 or higher.
- MongoDB: Running locally or on a cloud service like MongoDB Atlas.

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/pongsapak-suwa/backend-twitter-clone-API.git
cd backend-twitter-clone-API
```
### 2. Install Dependencies
```bash
npm install
```

### 2.1. Open docker and run docker compose (optional)
- Docker up (run MongoDB)
```bash
docker-compose up --build -d
```

- Docker down (close MongoDB)
```bash
docker-compose down
```

### 4. Set up .env file

- create file name '.env' or change name '.env.example' to '.env' with the following content.
```bash
PORT=8080
DATABASE_URI="mongodb://rootuser:rootpass@localhost:27017/test?authSource=admin"
ACCESS_TOKEN_SECRET="access token secret"
```
* if doens use local MongoDB used by docker-compose.yml change the URI for connecting to your MongoDB

### 5. Instruction to run the code

- To start the server in development mode:
```bash
npm start
```
> can view the API documents after run to link http://localhost:8080/api-docs/

- To run the test suite:
```bash
npm test
```
