# API Documentation

## Endpoints

### GET Requests

- **`GET /courses`**  
  Retrieves a list of all courses available on the server.

- **`GET /courses/:courseID`**  
  Retrieves a specific course by its unique identifier.

- **`GET /course/:courseID/lessons`**  
  Retrieves all lessons associated with a specific course identified by `courseID`.

- **`GET /course/:courseID/lesson/:lessonID`**  
  Retrieves a specific lesson within a given course using both `courseID` and `lessonID`.

### POST Requests

- **`POST /create-course`**  
  Creates a new course with the details provided in the request body.

- **`POST /course/:courseID/add-lesson`**  
  Adds a new lesson to a specific course identified by `courseID`.

### DELETE Requests

- **`DELETE /course/:courseID`**  
  Deletes a specific course identified by its `courseID`.

- **`DELETE /course/:courseID/lesson/:lessonID`**  
  Deletes a specific lesson within a given course using both `courseID` and `lessonID`.

### PUT Requests

- **`PUT /course/:courseID`**  
  Updates all data for a specific course identified by `courseID`. The request body should contain the complete updated course data.

- **`PUT /course/:courseID/lesson/:lessonID`**  
  Updates all data for a specific lesson within a given course using both `courseID` and `lessonID`. The request body should contain the complete updated lesson data.

### PATCH Requests

- **`PATCH /course/:courseID`**  
  Updates specific fields of a course identified by `courseID`. Only the fields included in the request body will be updated.

- **`PATCH /course/:courseID/lesson/:lessonID`**  
  Updates specific fields of a lesson within a given course using both `courseID` and `lessonID`. Only the fields included in the request body will be updated.
