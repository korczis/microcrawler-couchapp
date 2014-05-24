#! /usr/bin/env bash

 # Assign directory name to a variable
APP_NAME=${PWD##*/}

HOST="localhost"

PORT=5985

# Push couchapp
couchapp push . "http://apollo:apollo@$HOST:$PORT/$APP_NAME"
