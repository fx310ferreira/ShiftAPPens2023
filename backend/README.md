# ShiftAPPens2023 Backend

## Endpoints

### POST /login/
```json
{
  "type": "<student|school|imt>",
  "email": "string",
  "password": "string"
}
```

### POST /register/
```json
{
  "type": "<student|school>",
  "email": "string",
  "password": "string"
}
```

### POST /add/schedule/
```json
{
  "email": "email",
  "type": "<student|teacher|examiner>",
  "schedule": {
    "start": "2021-01-01T00:00:00Z",
    "end": "2021-01-01T00:00:00Z",
    "status": "<disponivel|conducao|codigo>"
  }
}
```

<!-- ```json
{
  "type": "<teorico|pratico>",
  "date": "2021-01-01T00:00:00.000Z",
  "status": "<pending|passed|failed>",
  "id_student": "string",
  "id_examiner": "string",
  "id_teacher": "string" // optional
}
```

### GET /get/
- exams -->