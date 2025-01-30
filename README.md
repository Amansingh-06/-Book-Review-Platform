# Book Review Platform

A full-stack web application that allows users to view books, submit reviews, and manage their profiles. The platform features a responsive UI built with React and a RESTful API backend built with Node.js and Express, connected to a MongoDB database.

## Features

### Frontend (React)
- **Responsive UI** with the following pages/components:
  - Home page with featured books
  - Book listing page with search and filter functionality
  - Individual book page with details and reviews
  - User profile page
  - Review submission form
- **State management** using Redux or React Context
- **React Router** for navigation
- Integration with the backend API for dynamic content
- **Error handling** and **loading states** for a better user experience

### Backend (Node.js, Express, SQL/MongoDB)
- **RESTful API** with the following endpoints:
  - `GET /books`: Retrieve all books (with pagination)
  - `GET /books/:id`: Retrieve a specific book
  - `POST /books`: Add a new book (admin only)
  - `GET /reviews`: Retrieve reviews for a book
  - `POST /reviews`: Submit a new review
  - `GET /users/:id`: Retrieve user profile
  - `PUT /users/:id`: Update user profile
- **Data validation** and **error handling** for API requests
- **MongoDB** used for data persistence

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB 

### Installation

#### Backend

1. Clone the repository:
   ```bash
   git clone  https://github.com/Amansingh-06/-Book-Review-Platform.git
   cd backend
