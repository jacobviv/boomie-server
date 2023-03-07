# API endpoints

## Auth routes

Base URL `/api/auth`

| HTTP Method | URI path       | Description        |
| ----------- | -------------- | ------------------ |
| GET         | `/verify`      | verify authToken   |x
| POST        | `/signup`      | signup handler     |x
| POST        | `/login`       | login handler      |x

## User routes

Base URL `/api/user`

| HTTP Method | URI path       | Description        |
| ----------- | -------------- | ------------------ |
| GET         | `/details/:id` | User details by ID |x
| PUT         | `/edit/:id`    | User edit by ID    |x
| DELETE      | `/delete/:id`  | User delete by ID  |x

## Battle routes

Base URL `/api/battles`

| HTTP Method | URI path                   | Description          |
| ----------- | -------------------------- | -------------------- |
| GET         | `/getAllBattles`           | All Battles          |x
<!-- | GET         | `/search?name={query}`     | Search by name       | -->
| GET         | `/details/:id`             | Get one Battle by ID |x
| POST        | `/saveBattle`              | Create new Battle    |x
| PUT         | `/edit/:id`                | Battle edit by ID    |x
| DELETE      | `/delete/:id`              | Battle delete by ID  |x

## Book routes

Base URL `/api/books`

| HTTP Method | URI path                   | Description        |
| ----------- | -------------------------- | ------------------ |
| GET         | `/getAllBooks`             | All Books          |x
<!-- | GET         | `/search?name={query}`     | Search by name     | -->
| GET         | `/details/:id`             | Get one Book by ID |x
| POST        | `/saveBook`                | Create new Book    |x
| PUT         | `/edit/:id`                | Book edit by ID    |x
| DELETE      | `/delete/:id`              | Book delete by ID  |x

## Movie routes

Base URL `/api/movies`

| HTTP Method | URI path                   | Description         |
| ----------- | -------------------------- | ------------------- |
| GET         | `/getAllMovies`            | All Movies          |x
<!-- | GET         | `/search?name={query}`     | Search by name      | -->
| GET         | `/details/:id`             | Get one Movie by ID |x
| POST        | `/saveMovie`               | Create new Movie    |x
| PUT         | `/edit/:id`                | Movie edit by ID    |x
| DELETE      | `/delete/:id`              | Movie delete by ID  |x

