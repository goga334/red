# red
REact+Django test project

There is no need to pull the whole repository in order to run the site. All you need is the docker-compose.yml file, which pulls all images needed fron the docker hub.

To run the site write command "docker-compose up" and open http://172.21.0.4:3000/user.

Possible errors:
  - docker may open react on another address. In this case just change it in the browser: http://*\<react address\>*:3000/user. The react address from the above will be shown in the console.

