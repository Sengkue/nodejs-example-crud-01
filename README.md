# Node API Project

This project is a basic Node.js API that includes user authentication and category management using Express.js, Sequelize, and MySQL.

## Getting Started

These instructions will help you set up the project on your local machine.

### Prerequisites

- Node.js and npm
- MySQL

### Installing

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. Install the required npm packages:
    ```sh
    npm install express body-parser cors nodemon dotenv bcrypt mysql2 sequelize
    ```

3. Create a `.env` file in the root directory and add your database configuration:
    ```sh
    DB_NAME='testseng'
    USER='root'
    PASSWORD=''
    PORT='8080'
    SECRET_KEY=1181
    ```

4. Create a `.gitignore` file in the root directory:
    ```sh
    .env
    node_modules
    package-lock.json
    ```

### Running the Server

1. To start the server, run:
    ```sh
    npm start
    ```
   The server will run on the port specified in the `.env` file (default: 8080).

## Project Structure

- `server.js`: Main entry point of the application.
- `config/db.js`: Database configuration and connection using Sequelize.
- `models/category.model.js`: Category model definition.
- `controllers/category.controller.js`: Category controller with CRUD operations.
- `router/router.js`: Main router file.
- `router/category.routes.js`: Category routes.

### Endpoints

- `GET /`: Welcome message.
- `POST /api`: Sample POST endpoint.
- `POST /category`: Create a new category.
- `GET /category`: Get all categories.
- `GET /category/:id`: Get a category by ID.
- `PUT /category/:id`: Update a category by ID.
- `DELETE /category/:id`: Delete a category by ID.

## Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/your-username)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
