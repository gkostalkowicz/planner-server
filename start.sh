#!/bin/sh
PORT=3030 \
  MONGODB_URI=mongodb://127.0.0.1/planner \
  DEBUG=planner-server:* \
  npm run devstart
