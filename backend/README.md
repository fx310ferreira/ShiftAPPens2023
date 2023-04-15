# ShiftAPPens2023 Backend

## Endpoints

### POST /login/
- student
- school
- imt
```json
// Request body: (for everyone)
{
  "email": "string",
  "password": "string"
}
```

### POST /register/
- student
- school
```json
// Request body: (student and school)
{
  "email": "string",
  "password": "string"
}
```
- teacher
- examiner
```json
// Request body: (teacher and examiner)
{
  "email": "string",
  "phone": "string",
}
```

### POST /add/
- schedule
```json
// Request body: (adding for student, teacher, examiner)
{
  "id": "string",
  "start": "2021-01-01T00:00:00.000Z",
  "end": "2021-01-01T00:00:00.000Z",
  "status": "<disponivel|conducao|codigo>"
}
```
- exam
```json
// Request body: (for everyone)
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
- exams