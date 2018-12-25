#!/bin/bash

# build app
yarn build

# deploy to firebase
firebase deploy
