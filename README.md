# node-todo-api
API back end service for To Do Application

Routes: 

Get user {
  GET request to '/users/me' route
  Request headers must contain 'x-auth' field with valid token.
}

Create a new user {
  POST request to '/users' route
    Request must include JSON with following parameteres - 'email', 'password'. It response with the '_id' of newly created user and his       email in the body and the access token ('x-auth') in the headers.
    If email is already in use status 400 (Bad Request) is returned.
    If email is not valid status 400 (Bad Request) is returned.
}

Login with credentials {
  POST request to '/users/login' route
    Request must include JSON with following parameteres - 'email', 'password'. It response with the '_id' of newly created user and his       email in the body and the access token ('x-auth') in the headers.
    If email or password is incorrect status 400 (Bad Request) is returned.
}

Delete user {
  DELETE request to '/'
}

// Application is not ready for use.
