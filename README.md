# red
REact+Django test project

There is no need to pull the whole repository in order to run the site. All you need is the docker-compose.yml file, which pulls all images needed fron the docker hub.

## To run with docker-compose 
  write command "docker-compose up" and open http://localhost:3000/user.

Possible errors:
  - you may need to run the command with "sudo".

 ## To run with the source code 
  clone this repository and in the cloned folder do the following steps:
  - migrate django models
 ```
 python backend/manage.py migrate
 ```   
 - install react packages
 ```
 npm install axios --save --prefix frontend/
 ```
 ```
 npm install --save react-router-dom --prefix frontend/
 ```
 - run django server
 ```
 python backend/manage.py runserver
 ```
 - run react server
 ```
 npm start --prefix frontend/
 ```
  - open http://localhost:3000/user
