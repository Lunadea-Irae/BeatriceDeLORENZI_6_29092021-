# Welcome on the <img src="./images_readme/PiicanteLogo.png" alt="Piicante" width="200px"> Project !

## Prerequisites
You will need to have **Node**, **Angular CLI 7.0.2.** and **npm** installed locally on your machine.

## Backend

Clone this repo. From within the project folder **/backend**, run **npm install**. You can then run the server with **npm run start**. The server should run on localhost with default port 3000.

## FrontEnd
From within the project folder **/frontend**, run **npm install**. You can then run the server with **npm run start:win32** for Window OS or **npm run start:linux:darwin** for Linux OS. The server should start and open the web page in your favourite browser.

</br></br>

## Context of the project
Piiquante is dedicated to the creation of spicy sauces whose recipes are kept secret. To build on its success and generate more buzz, the company wants to create a web application where users can add their favorite their favorite sauces and like or dislike the sauces added by others.

## Specifications
              
|   | Access point  | Request body (if applicable)  | Type of response expected | Function |
| - | :-----------: | :---------------------------: | :-----------------------: | :------- |
| POST | /api/auth/signup | { email: string, password: string } | { message: string } | Hiding the user's password of the user, adding the user to the database. database. |
| POST | /api/auth/login|{ email: string, password:string }|{ userId: string, token: string }|Verification of identification information of the user, returns the user's _id from the database and a signed JSON web token token (also containing the user _id of the user).|
| GET |/api/sauces|-|Array of sauces|Returns an array of all the sauces in the database database|
| GET |/api/sauces/:id|-|Single sauce|Returns the sauce with the _id provided.|
| POST |/api/sauces |{ sauce: String, image: File }|{ message: String } Verb|Captures and saves the image, parses the sauce transformed into a string and saves it in the database by setting its imageUrl correctly. Initializes the likes and dislikes of the sauce to 0 and usersLiked and usersDisliked with empty arrays. Notice that the initial request body is empty; when multer is added, it returns a string for the request body based on the data submitted with the file.|
| PUT |/api/sauces/:id |EITHER Sauce as JSON OR { sauce: String, image: File }|{ message: String }|Updates the sauce with the _id provided. If an image is uploaded, it is captured and the imageUrl of the is updated. If no file is provided, the information about the sauce is directly in the in the body of the request (req.body.name, req.body.heat, etc.). If a file is provided, the sauce transformed into a string characters is in req.body.sauce. Note that the body of the initial request request is empty; when multer is added, it returns a string of the request based on the data submitted with the file.|
| DELETE |/api/sauces/:id |-|{ message: String }|Delete the sauce with the _id provided.|
| POST |/api/sauces/:id/like| { userId: String, like: Number }|{ message: String }|Sets the "Like" status for the provided userId. If like = 1, the user likes the sauce. If like = 0, the user cancels his like or his dislike. If like = -1, the user does not like (= dislike) the sauce. The ID of the user's ID must be added or removed from the appropriate table. This allows to keep track of their preferences and preferences and prevents them from liking or not liking the same sauce several times: a user can only have one have only one value for each for each sauce. The total number of "Like" and "Dislike dislikes" is updated with each new each new rating.|

### API Errors
Any errors must be returned as they are produced, without any modification or addition. If necessary, use a new Error().

### API Routes
All sauce routes for sauces must have an authorization (the token is sent by the front-end with the authorization header: "Bearer \<token\>"). Before the user can make changes to the sauce route, the code must check if the current userId matches the userId of the sauce. If the userId does not match, return "403: unauthorized request." This ensures that only the owner of the sauce can make changes to it.

### Data Models
#### Sauces
* userId: String - the unique MongoDB identifier of the user who created the sauce
* name: String - the name of the sauce
* manufacturer: String - manufacturer of the sauce
* description : String - description of the sauce
* mainPepper : String - the main spicy ingredient of the sauce
* imageUrl: String - the URL of the sauce image uploaded by the user
* heat : Number - number between 1 and 10 describing the sauce
* likes : Number - number of users who like (=like) the sauce
* dislikes : Number - number of users who dislike the sauce
* usersLiked : [ "String <userId\>" ] - array of user IDs that liked (= liked) the sauce
* usersDisliked: [ "String <userId\>" ] - array of user IDs of users who disliked (= disliked) the sauce
#### Users
* email: String - user's email address [unique\].
* password: String - user's hashed password

## Security Requirements.
* The user's password must be hashed.
* Authentication must be enforced on all required sauce routes.
* Email addresses in the database are unique and an appropriate
appropriate Mongoose plugin is used to ensure their uniqueness and report
errors.
* The security of the MongoDB database (from a service such as
MongoDB Atlas) should not prevent the application from running on a user's
user's machine.
* A Mongoose plugin must ensure the feedback of errors from the database.
database.
* The most recent versions of the software are used with updated security patches.
security patches.
* The contents of the images folder should not be uploaded to GitHub.
</br></br></br>
