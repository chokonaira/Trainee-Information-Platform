# Trainee Management Platform

Trainee Management Platform is a simple Information Platform built with NodeJS/Express and Redis. Where authenticated users can create register, create, read, update and delete trainee records. 


## Badges
[![Build Status](https://travis-ci.org/chokonaira/Trainee-Information-Platform.svg?branch=master)](https://travis-ci.org/chokonaira/Trainee-Information-Platform) [![Coverage Status](https://coveralls.io/repos/github/chokonaira/Trainee-Information-Platform/badge.svg?branch=master)](https://coveralls.io/github/chokonaira/Trainee-Information-Platform?branch=master)

### API Endpoints
Hosted API can be found here: [ Heroku API ](https://enyata-tmp.herokuapp.com/)

### API Documentation
View Postman Documention spec here: [ Postman Doc ](https://documenter.getpostman.com/view/8211988/SVtSXpzD?version=latest#c42bc852-2084-49d5-ad6b-71ead6508c2f)

### Key Application Features
1. User can sign up.
2. User can login.
3. Authenticated User can create trainee record.
5. Authenticated User can get single trainee record.
5. Authenticated User can get all trainee records.
6. Authenticated User can update a trainee record.
7. Authenticated User can create delete a trainee record.

### API Information

METHOD |    DESCRIPTION       |   ENDPOINTS
-------|----------------------|-------------------------
POST | User Sign up | https://enyata-tmp.herokuapp.com/api/v1/auth/signup
POST | User Login | https://enyata-tmp.herokuapp.com/api/v1/auth/login
POST | create Trainee record | https://enyata-tmp.herokuapp.com/api/v1/trainees/add
GET | View Single Trainee record | https://enyata-tmp.herokuapp.com/api/v1/trainees/:id
GET | View all Trainee records | https://enyata-tmp.herokuapp.com/api/v1/trainees
PATCH | Edit a Trainee record | https://enyata-tmp.herokuapp.com/api/v1/trainees/edit/:id
DELETE | Delete a Trainee record | https://enyata-tmp.herokuapp.com/api/v1/trainees/:id

### Installation

- Clone the repository.
``` https://github.com/chokonaira/Trainee-Information-Platform.git```
- Run npm install
- Change .env.sample to .env and configure environmental variable
- Install postman to test endpoints

## Built With

* [NodeJs](https://nodejs.org/) - JavaScript runtime environment
* [Redis](https://redis.io/documentation) - Redis open source cache
* [ExpressJs](https://expressjs.com) - Node RESTful API framework

## Authors

* **Henry Okonkwo**