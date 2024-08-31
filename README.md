## Technologies

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building the REST API.
- **TypeORM**: Object Relational Mapping (ORM) for database interaction.
- **PostgreSQL**: Relational database to store user and book data.
- **TypeScript**: Strongly typed programming language that builds on JavaScript.
- **Joi**: Data validation library.
- **dotenv**: Environment variable management.

## Getting Started

Create a `.env` file in the root directory and add the following variables:

```bash
PORT=
DATABASE_URL=
```

The API will be available at `http://localhost:3000`.

### API Endpoints

#### Users

- **List Users**: `GET /users`
- **Get User by ID**: `GET /users/:id`
- **Create User**: `POST /users` (Body: `{ "name": "User Name" }`)
- **Borrow Book**: `POST /users/:userId/borrow/:bookId`
- **Return Book**: `POST /users/:userId/return/:bookId` (Body: `{ "score": 9 }`)

#### Books

- **List Books**: `GET /books`
- **Get Book by ID**: `GET /books/:id`
- **Create Book**: `POST /books` (Body: `{ "name": "Book Name" }`)

### Error Handling

- Custom error handling is implemented to return appropriate error messages and status codes for various scenarios, such as attempting to borrow a non-existent book or user.

### Versions
- **npm**: 10.8.2
- **node**: v20.16.0
