#! /usr/bin/env bash

 # Assign directory name to a variable
APP_NAME=${PWD##*/}

USERNAME="apollo"

PASSWORD="apollo"

HOST="localhost"

PORT=5984

# Push couchapp
couchapp push . "http://$USERNAME:$PASSWORD@$HOST:$PORT/$APP_NAME"
