# Students Course Management System Backend

Express.js + Sequelize + SQLite backend for the "Students Course Management System" requirement.

## Run locally

```bash
npm install
cp .env.example .env
npm run seed
npm run dev
```

## Run with Docker

```bash
docker-compose up --build
```

## API docs

- OpenAPI spec: `docs/openapi.yaml`
- Postman collection: `docs/postman_collection.json`
- Swagger UI endpoint: `http://localhost:4000/api-docs`
- OpenAPI JSON endpoint: `http://localhost:4000/openapi.json`
- Swagger Editor locally: import `docs/openapi.yaml` into Swagger Editor or any OpenAPI viewer

## Default seed users

- Admin: `admin@scms.local` / `Admin123!`
- Manager: `manager@scms.local` / `Manager123!`
- Teacher: `teacher@scms.local` / `Teacher123!`
- Student: `student@scms.local` / `Student123!`
