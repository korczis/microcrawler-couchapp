#! /usr/bin/env bash

echo "Running grunt ..."
grunt
echo

echo "Calling push script ..."
./push.sh
echo

