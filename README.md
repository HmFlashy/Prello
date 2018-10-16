# Prello ![](https://travis-ci.com/HmFlashy/Prello.svg?token=H9stsxmjt3Ar2bnQk6hz&branch=master)
Project manager based on boards, list and cards

## Requirements
* Have a mongo server running either docker or mongod

* Set up mongo with docker

```
$ docker pull mongo
$ docker run -p 27017:27017 -v data:/data/db mongo
```

## Installation

```
$ git clone https://github.com/HmFlashy/Prello
$ cd Prello
$ npm install install:all:dev
```
Create a .env file following the .modelenv model and fill it. (This is an example)
```
NODE_ENV=development
URL_MONGODB=http://localhost:27017
```
```
$ npm run dev
```
