# Prello ![](https://travis-ci.org/HmFlashy/Prello.svg?branch=master)
Project manager based on boards, list and cards

## Requirements
* Have a mongo server running either docker or mongod and have a redis server running

* Set up mongo with docker

```
$ docker pull mongo
$ docker run -p 27017:27017 -v data/db:/data/db mongo
# -v local-folder:docker-folder
```

* Set up mongo without docker

```
Install mongod in global and go to the Prello directory
$ mongod --dbpath=data/db/
```

* Set up redis
```
For windows, you will need to enable WSL (Windows Subsystem for Linux) by following this 
link : https://redislabs.com/blog/redis-on-windows-10/

For Linux and Mac, the instructions are also in the previous link in the "Install and Test 
Redis" part :
$ sudo apt-get install redis-server
$ sudo service redis-server start
```

## Installation

* First you'll have to install the ldap client module using npm which is a native module.
```
$ apt install libldap2-dev # Install ldap libraries
$ apt install g++ make
```

```
$ git clone https://github.com/HmFlashy/Prello
$ cd Prello
$ npm install install:all:dev
```
* Create .env files in both client and server directories following the .modelenv models. (This is an example)
```
NODE_ENV=development
URL_MONGODB=http://localhost:27017/Prello
```

* Initialize the database (seeders)
```
$ npm run init:db
```

* Start the server and the client
```
$ npm run dev
```
