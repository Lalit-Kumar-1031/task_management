Node.js Authentication Backend

This project contains a basic authentication system built using Node.js, Express, MongoDB, JWT, and bcrypt.
It supports user registration, login, access token and refresh token handling, protected routes, token refresh, and logout functionality.

Tech Stack

Node.js

Express.js

MongoDB (Mongoose)

JSON Web Token (JWT)

bcrypt

dotenv

Features

User registration with hashed password

Login with access token and refresh token

Short-lived access token

Refresh token stored in database

Protected APIs using JWT middleware

Generate new access token using refresh token

Logout by invalidating refresh token

Project Structure
controller/
  userController.js

middleware/
  auth.js

model/
  user.js

routes/
  userRoutes.js

.env
app.js
server.js

Environment Setup

Create a .env file in the root directory and add the following values:

PORT=3000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

How to Run the Project

Clone the repository

Install dependencies

npm install


Start the server

npm run dev


or

node server.js


Server will run on:

http://localhost:3000

API Endpoints
Register User

POST /auth/register

Request body:

{
  "name": "Lalit",
  "email": "lalit@gmail.com",
  "password": "password123"
}

Login User

POST /auth/login

Request body:

{
  "email": "lalit@gmail.com",
  "password": "password123"
}


Response:

{
  "accessToken": "...",
  "refreshToken": "..."
}

Refresh Access Token

POST /auth/refresh

Request body:

{
  "refreshToken": "your_refresh_token"
}


Response:

{
  "accessToken": "new_access_token"
}

Get User Data (Protected)

GET /auth/user-data

Headers:

Authorization: Bearer <access_token>

Logout User (Protected)

POST /auth/logout

Headers:

Authorization: Bearer <access_token>


Response:

{
  "message": "Logout successful"
}

Authentication Flow

User logs in and receives access token and refresh token

Access token is used for protected API calls

When access token expires, refresh token is sent to get a new access token

On logout, refresh token is removed from the database

Notes

Access tokens are short-lived for better security

Refresh tokens are stored in the database to allow invalidation

Cookies are not used; tokens are expected from client headers or request body

Author

This project was created as a backend authentication task using Node.js and MongoDB.
