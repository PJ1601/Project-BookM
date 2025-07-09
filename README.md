#  Bookstore REST API

A secure, file-based Bookstore API built with Node.js and Express. Supports user authentication, CRUD operations, and query features like search and pagination.

##  Features

-  JWT-based user authentication
-  JSON file persistence (books & users)
-  CRUD operations for books
-  Filter by genre, paginate results
-  Ownership checks for updating/deleting
-  Middleware for logging & error handling

## Setup Instructions
<>
```bash
# Clone or navigate into your project folder
cd bookstore-api

# Install dependencies
npm install

# Create your .env file for JWT secret
touch .env
</>

Start the server:

<>
bash
npm run dev
</>

# Authentication Endpoints:

Method	     Endpoint	            Description
POST	    /api/auth/register	    Register a new user
POST	    /api/auth/login	        Login and receive a JWT

# Book Endpoints (Protected by JWT):

Method	       Endpoint	            Description
GET	          /api/books	        List all books
GET	          /api/books/:id	    Get book by ID
POST	      /api/books	        Add a new book (user-auth only)
PUT	          /api/books/:id	    Update a book (only owner)
DELETE	      /api/books/:id	    Delete a book (only owner)

## How to Test Endpoints -

# Register a 
<>
bash
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"email":"test@example.com", "password":"password123"}'
</>

#Login and get JWT token:
<>
bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"test@example.com", "password":"password123"}'
</>
Copy the token from the response for use in subsequent requests.

#Add a book :
<>
bash
curl -X POST http://localhost:3000/api/books \
-H "Authorization: Bearer YOUR_TOKEN_HERE" \
-H "Content-Type: application/json" \
-d '{
  "title":  "Code world",
  "author": "C. devid",
  "genre": "Programming",
  "publishedYear": 2006
}'
</>

#Get list of books
<>
bash
curl -X GET http://localhost:3000/api/books \
-H "Authorization: Bearer YOUR_TOKEN_HERE"
</>