# API endpoints

## Auth routes

Base URL `/api/auth`

| HTTP Method | URI path       | Description        |
| ----------- | -------------- | ------------------ |
| POST        | `/signup`      | signup handler     |
| POST        | `/login`       | login handler      |
| GET         | `/verify`      | verify authToken   |
| PUT         | `/:id/edit`    | User edit by ID    |
| DELETE      | `/:id/delete`  | User delete by ID  |

## Battle routes

Base URL `/api/battle`

| HTTP Method | URI path                   | Description        |
| ----------- | -------------------------- | ------------------ |
| GET         | `/getAllBattles`           | All Battles        |
| GET         | `/search?name={query}`     | Search by name     |
| POST        | `/saveBattle`              | Create new Battle    |
| GET         | `/:id`                     | Get one Battle by ID |
| PUT         | `/:id/edit`                | Battle edit by ID    |
| DELETE      | `/:id/delete`              | Battle delete by ID  |

