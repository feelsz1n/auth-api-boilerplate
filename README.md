# Auth API

A secure and scalable authentication API built with **Fastify**, **Prisma**, **Zod**, and **JWT**. This API allows for user registration, login, and access token renewal using JWTs.

## Features

- **User Registration**: Create a new account with a username and password.
- **Login**: Authenticate with a username and password to receive access and refresh tokens.
- **Refresh Token**: Renew the access token using the refresh token.
- **Protected Routes**: Access protected resources using the access token.
- **Data Validation**: Robust input validation using **Zod**.
- **Automatic Documentation**: API documentation automatically generated with **Swagger**.

## Technologies Used

- **Fastify**: Fast and efficient web framework for Node.js.
- **Prisma**: Modern ORM for databases.
- **Zod**: TypeScript-first schema validation library.
- **JWT**: JSON Web Tokens for secure authentication.
- **Swagger**: Interactive API documentation.

## Prerequisites

- Node.js (v18 or later)
- pnpm or yarn
- PostgreSQL database

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/feelsz1n/auth-api-boilerplate.git
   cd auth-api
   ```
2. Install dependencies:

   ```bash
   pnpm install
   # or
   yarn install
   ```

## Endpoints

The API offers the following endpoints:
- **Endpoint prefix**: `http://localhost:3333`

- `POST /login`: Login endpoint to obtain access and refresh tokens.
- `POST /register`: Endpoint to register a new user.
- `POST /refresh-token`: Endpoint to renew the access token using the refresh token.
- `GET /protected`: Protected endpoint that requires a valid access token to access.

## Documentation

API documentation can be accessed at [Swagger](http://localhost:3000/docs).

## Contribute

If you enjoyed this project and wish to contribute, feel free to open a pull request or report a bug. Thank you for contributing!

