# API Documentation
The GPA Calculator API is a REST API for managing courses and calculating GPA, implemented as a Vercel serverless function.

## Specification
View the full API specification in [docs/openapi.yaml](https://github.com/Amaya-Wickramaarachchi/gpa-calculator/blob/main/docs/openapi.yaml).

## Overview
- **Base URL**: `https://gpa-calculator.vercel.app/api` (prod) or `/api` (local).
- **Authentication**: API key via `X-API-Key` header.
- **Endpoints**:
  - `POST /courses`: Add a course.
  - `GET /courses`: Retrieve all courses.
  - `DELETE /courses`: Clear all courses.
  - `GET /gpa`: Calculate GPA.

## Example Request
```bash
curl -X POST https://gpa-calculator.vercel.app/api/courses \
  -H "X-API-Key: gpa-calculator-key" \
  -H "Content-Type: application/json" \
  -d '{"name":"Math 101","grade":"A","credits":3}'