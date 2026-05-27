# News Explorer

News Explorer is a React-based web application that allows users to search for news articles through the NewsAPI service, save favorite articles, and manage authentication through protected routes and a custom AuthAPI.

This project was developed as part of the TripleTen Brasil Web Development program.

---

## Features

- User authentication and authorization
- Protected routes for authenticated users
- Save and remove articles from a personal collection
- Form validation and error handling

---

## Tech Stack

### Backend

- Node
- Express
- MongoDB
- Mongoose
- Bcrypt

### API

- NewsAPI
- Custom AuthAPI

---

## Installation

Clone the repository:
git clone https://github.com/bastienroque/news-explorer-backend.git

Navigate into the project directory:
cd news-explorer-backend

Install dependencies:
npm install

Start the development server:
npm run dev

---

## API Configuration

This project uses the --- service to fetch news articles.
To run the project locally, you need to create your own API key.

### 1. Create a NewsAPI account

Go to the official website:

Create an account and generate an API key.

### 2. Create a `.env` file

In the root directory of the project, create a file named:
.env

### 3. Inside the .env file, add the API Key as follows :

---

## Project Structure

├── controllers/
├── middleware/
├── models/
└── routes/

---

## Future Improvements

- To be determined

---

## Author

Developed by Bastien Roque
