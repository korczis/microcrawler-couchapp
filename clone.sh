#! /usr/bin/env bash

 # Assign directory name to a variable
APP_NAME=${PWD##*/}

USERNAME="apollo"

PASSWORD="apollo"

HOST="localhost"

PORT=5985

couchapp clone http://$USERNAME:$PASSWORD@$HOST:$PORT/$APP_NAME/_design/$APP_NAME $APP_NAME