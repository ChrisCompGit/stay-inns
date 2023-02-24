# STAY-INNS - resort website

## Objective
This is my first dynamic web app that utilises the following stack in an MVC design pattern:
- PostgreSQL
- Node.js
- Express
- Express-Handlebars

## Directory
In the following list, I will only cover the key folders pertinent to the project.

**1. Config folder**
The db.js file found in this folfer contains code that connects my server to my database. Uses "node-postgres"

**2. Controllers**
This folder contains the various controllers for each specific user type and action*. Controllers contain routes and each user will only be allowed access to certain routes based on their "user type" to view data that pertains to them. These are:
- **adminController.js** - has routes associated with the admin user. Allows access to protected pages/functionality such as: Add a Property, Edit a Property, Delete a Property, View All Properties (created by that specific admin)
- **authController.js** - has routes associated with logging in and logging out. * *While this is not user specific, it handles actions linked to all user types*
- **generalController.js** - has routes for anyone visiting the site that has not logged in
- **userController.js** - has routes associated with the basic user. *Admins are created at the database level using SQL directly on the Postgres Terminal*

**3. Middleware**
Middleware is executed as soon as the http request is received for that route and it can restrict the handling of the route if the criteria for the middleware's successful completion are not met. 
This folder contains all middleware functionality needed to either:
- validate that a user is allowed access to particular pages and redirect them where necessary
- used for error checking on forms

**4. Migrations**
Contains the SQL code used to create the database in PostgreSQL.

**5. Models**
Contains all database code which can be referenced in the controllers to perform actions on the database.
- **authModel.js** - this has all authentication code. Currently only has an "authenticate" method using bcrypt
- **propertyModel.js** - this has all methods related to the "Properties" table in the database
- **userModel.js** - this has all methods related to the "Users" table in the database

**6. Public**
Contains front-end files and code needed for displaying data. i.e. images, CSS, front-end JavaScript

**7. Views**
This folder contains all the web pages that can be displayed. Following the directory setup for Express Handlebars, this folder contains a main.handlbars file which has the base code that will be used across all pages. All other pages will be injected into the main.handlebars file via the {{{body}}} placeholder.