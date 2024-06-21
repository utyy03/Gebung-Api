# Gebung Backend API

The following is part of the Capstone Project "Gebung" by Bangkit Academy 2024. This API provides various functions for the Gebung application, including user login, user registration, user logout, displaying user data, changing username, changing email, changing password, and deleting user account.

## Prerequisites

Before running the application, ensure you have the following installed on your machine:
- Node.js
- npm

## Technologies Used

Used in the Capstone Project are:
1. **Express.js**: A Node.js framework for building web applications.
2. **bcrypt**: For password hashing.
3. **jsonwebtoken**: For creating and verifying JWT tokens.
4. **MySQL**: As the database.
5. **nanoid**: For generating unique IDs.
6. **Cloud Run**: For deploying the application.
7. **Cloud Build**: For continuous integration and delivery (CI/CD) services.
8. **Cloud SQL**: As the managed database service.
9. **Cloud Storage**: For storing images and other files.

## Installation

To install and run the API, follow these steps:

1. Clone the repository:
    ```bash
    https://github.com/utyy03/Gebung-Api.git
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables. Create a `.env` file in the root of the project and add the necessary configuration values (e.g., database credentials, JWT secret).

5. Run the server:
    ```bash
    npm start
    ```

## API Endpoints
For complete documentation and API usage, please see [Dokumentasi Postman](https://documenter.getpostman.com/view/34754286/2sA3XV7eMB)

### Register
- **Endpoint**: `/register`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:
    ```json
   {
    "username" : "user5",
    "email" : "user5@gmail.com",
    "password" : "user12345"
   }
    ```
- **Response**:
    ```json
    {
    "code": 200,
    "status": "OK",
    "message": "Registration is successful",
    "data": {
        "username": "user5",
        "email": "user5@gmail.com"
    }
  }
    ```

### Login
- **Endpoint**: `/login`
- **Method**: `POST`
- **Description**: Logs in a user.
- **Request Body**:
    ```json
    {
    "email" : "user5@gmail.com",
    "password" : "user12345"
    }
    ```
- **Response**:
    ```json
    {
    "code": 200,
    "status": "OK",
    "message": "Logged in successfully",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlRJUzZKbmQyV1pKOXNiNnIiLCJlbWFpbCI6InVzZXI1QGdtYWlsLmNvbSIsImlhdCI6MTcxODk0NTQ3NywiZXhwIjoxNzI0MTI5NDc3fQ.zigMTsLY7pLh-85f_to71S4KYuVVl2Fn0pH-22-BW8k",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlRJUzZKbmQyV1pKOXNiNnIiLCJlbWFpbCI6InVzZXI1QGdtYWlsLmNvbSIsImlhdCI6MTcxODk0NTQ3N30.w6Y2ig1jjLe4I0h8RBOv-88Rj2E0U3Cu2oaKG7CcPu8"
    }
   }
    ```

### Logout
- **Endpoint**: `/logout`
- **Method**: `POST`
- **Description**: Logs out a user.
- **Headers**:
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```
- **Response**:
    ```json
    {
    "code": 200,
    "status": "OK",
    "message": "Logout successfully"
    }
    ```

### Get User Data
- **Endpoint**: `/users`
- **Method**: `GET`
- **Description**: Retrieves the logged-in user's data.
- **Headers**:
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```
- **Response**:
    ```json
    {
    "code": 200,
    "status": "OK",
    "message": "Success grab data user",
    "data": [
        {
            "username": "user5",
            "email": "user5@gmail.com"
        }
    ]
   }
    ```

### Update Username and email
- **Endpoint**: `/users`
- **Method**: `PUT`
- **Description**: Updates the user's username and email.
- **Headers**:
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```
    
- **Request Body**:
    ```json
    {
    "username" : "user3",
    "email" : "user3@gmail.com"
    }
    ```
- **Response**:
    ```json
    {
    "code": 200,
    "status": "OK",
    "message": "update user is success",
    "data": {
        "username": "user3",
        "email": "user3@gmail.com"
     }
    }
    ```

### Change Password
- **Endpoint**: `/users/changePassword`
- **Method**: `PUT`
- **Description**: change the user's password.
- **Headers**:
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```
- **Request Body**:
    ```json
   {
    "oldPassword":"user12345",
    "newPassword": "user202020",
    "confirmPassword": "user202020"
   }
    ```
- **Response**:
    ```json
   {
    "code": 200,
    "status": "OK",
    "message": "change password is success"
   }
    ```

### Delete User
- **Endpoint**: `/users/user_id`
- **Method**: `DELETE`
- **Description**: Deletes the user's account.
- **Headers**:
    ```
    "Authorization": "Bearer <token>"
    ```
- **Response**:
    ```json
   {
    "code": 200,
    "status": "OK",
    "message": "User deleted successfully"
   }
    ```
