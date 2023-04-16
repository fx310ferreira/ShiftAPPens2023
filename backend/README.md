# ShiftAPPens2023 Backend

## Setup
Run the mongodb server
```bash
sudo systemctl start mongod
```

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

### POST /register/et/
```json
{
  "type": "<teacher|examiner>",
  "data": {
    "email": "examiner@test.pt",
    "phone": "931456789"
  }
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
    "status": "<available|drive|code>"
  }
}
```

### POST /schedules/sym/
```json
{
  "status": "<available|drive|code>",
  "month": 1,
  "year": 2021
}
```

### POST /add/exam/
```json
{
  "type": "<code|drive>",
  "date": "2021-01-01T00:00:00.000Z",
  "status": "<pending|passed|failed>",
  "approval": "<accepted|rejected>"
}
```

### POST /exams/ym/
```json
{
  "month": 1,
  "year": 2021
}
```


### GET
- /exams/
- /schedules/
- /schedule/:id/