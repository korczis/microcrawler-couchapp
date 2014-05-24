#! /usr/bin/env bash

 # Assign directory name to a variable
APP_NAME=${PWD##*/}

# Push couchapp
couchapp push . "http://localhost:5984/$APP_NAME"
