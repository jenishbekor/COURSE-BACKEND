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

## API endpoints

Base URL: `http://localhost:4000`

### Public

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/health` | Server health check |
| `POST` | `/api/auth/login` | Login and get JWT token |
| `POST` | `/api/auth/register-student` | Register a new student account |

### Admin endpoints

Auth: `Bearer <token>` with `Admin` role

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/admin/departments` | List all departments |
| `POST` | `/api/admin/departments` | Create department |
| `POST` | `/api/admin/departments/:departmentId/managers` | Assign manager to department |
| `GET` | `/api/admin/academic-years` | List academic years |
| `POST` | `/api/admin/academic-years` | Create academic year |
| `GET` | `/api/admin/semesters` | List semesters |
| `POST` | `/api/admin/semesters` | Create semester |
| `GET` | `/api/admin/users` | List users |
| `POST` | `/api/admin/users` | Create user by role |
| `PATCH` | `/api/admin/users/:id` | Update user |
| `GET` | `/api/admin/groups` | List groups |
| `POST` | `/api/admin/groups` | Create group |
| `GET` | `/api/admin/students` | List students |

### Manager endpoints

Auth: `Bearer <token>` with `Manager` or `Admin` role

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/manager/courses` | List courses |
| `POST` | `/api/manager/courses` | Create course |
| `GET` | `/api/manager/curriculums` | List curriculums |
| `POST` | `/api/manager/curriculums` | Create curriculum |
| `POST` | `/api/manager/curriculum-courses` | Add course to curriculum |
| `GET` | `/api/manager/semester-courses` | List semester courses |
| `POST` | `/api/manager/semester-courses` | Activate semester course and assign teacher |
| `PATCH` | `/api/manager/semesters/:semesterId` | Update semester fields and status |

### Teacher endpoints

Auth: `Bearer <token>` with `Teacher` role

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/teacher/courses` | List assigned teacher courses |
| `PATCH` | `/api/teacher/semester-courses/:semesterCourseId/syllabus` | Update syllabus |
| `PATCH` | `/api/teacher/semester-courses/:semesterCourseId/grade` | Grade enrolled student |

### Student endpoints

Auth: `Bearer <token>` with `Student` role

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/student/me` | Get current student profile |
| `GET` | `/api/student/available-courses` | List suggested and active courses |
| `POST` | `/api/student/enrollments` | Enroll by `course_code` |
| `GET` | `/api/student/history` | Get academic history and grades |

## Default seed users

- Admin: `admin@scms.local` / `Admin123!`
- Manager: `manager@scms.local` / `Manager123!`
- Teacher: `teacher@scms.local` / `Teacher123!`
- Student: `student@scms.local` / `Student123!`
