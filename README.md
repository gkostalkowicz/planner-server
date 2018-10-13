# planner-server

This repository contains server of the Planner application. Client repository is available under https://github.com/gkostalkowicz/planner-client.

## Starting local development

Below is a quick guide how to set up local development environment and start the application.

First, make sure you have a MongoDB database instance to connect to. For example, you can install it directly on your system, run MongoDB in a Docker container, or connect to a MongoDB instance in cloud. A simple way to run MongoDB on a Linux or Mac machine is to use Docker. To run MongoDB using Docker:

1. Make sure Docker is installed on your computer.
2. Run `sudo docker run -p 27017:27017 mongo` to start the container.
3. Confirm with `sudo docker ps` that the container is running.
4. MongoDB should be now accessible on local machine on port 27017.

With MongoDB in place, start the server:

1. Make sure Node.js and npm is installed on your computer.
2. Make sure MongoDB URL in `start.sh` is set correctly. You can stay with the current `start.sh` file without modifying it and create an alias for your MongoDB host in your OS's `hosts` file.
3. Start the application by typing `./start.sh` in your console.
4. Server should be listening for connections under http://localhost:3030/. You can check if it works by sending a GET request to http://localhost:3030/events - `{"error":"username_missing"}` response should be returned.
