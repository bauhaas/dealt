# Dealt interview project

## Description

### API

API runs with [NestJS](https://nestjs.com/).

The API documentation is available at `localhost:3001/api/docs`. I've used swagger to document the API. If you want to try out notes endpoints, you will have to authenticate first and get the token to use it in the swagger UI.

A Postgresql database is used to store the data with Prisma as the ORM.

### Client

Client is a next.js application. The application is available at `localhost:3000`. It has a signin/singup page and the main page with a dashboard to manage notes.

For the components, i've used [shadcn/ui](https://ui.shadcn.com/) components.
[nextauth](https://next-auth.js.org/) is used, as required, for authentication.

The API client for the notes domain is consumed within it's context. Main reason is to abstract the API calls from the components and separation of concerns

I only did it for notes as it was the only domain having a "complete" CRUD implementation.

## How to get started

## Notes

Don't consider small size indicator is displayed on the bottomleft, becomes hidden when we are in prod. Used it as utils for dev. And my setup up run the app in dev mode.

### Requirements

- [x] User authentication (handled with email and password)
  - [x] Signin
  - [x] Signup
- [x] User creation
- [x] Note CRUD
- [x] Unit test for the API services
- [x] Postgres DB for data storage
- [x] Dockerize the application
- [x] shadcn/ui components for the client
- [x] basic scope guard implementation

Concerning the scope guard, I've added the scopes in the `login` method of my authentication sevice. It's only a demonstration. Usually, scopes should be set by an external consumer of the API to grants access to specific resources.

### Improvements

- [ ] Complete code coverage on unit test for the API
- [ ] Add test for the client
- [ ] API Logger implementation
- [ ] logout from session (forgot early and i was out of time
- [ ] APIClient and types autogeneration for the client based on API doc with[openapi-typescript-codegen](https://www.npmjs.com/package/openapi-typescript-codegen/v/0.11.2). I've used it in the past and it's a great tool to stick to one source of truth for the API and also to have types for the client identical to the API.
- [ ] Token refresh
- [ ] Client skeleton UI for loading state
