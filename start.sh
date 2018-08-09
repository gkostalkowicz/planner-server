#!/bin/sh
PORT=3030 \
  MONGODB_URI=mongodb://mongo/planner \
  DEBUG=planner-server:* \
  npm run devstart
