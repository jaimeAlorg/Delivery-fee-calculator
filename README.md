# Delivery Fee Calculator

## Table of Contents

1. [Introduction](#introduction)
2. [Available Scripts](#available-scripts)
3. [Live Demo](#live-demo)
4. [How To Use Docker](#how-to-use-docker)

## Introduction

This web application is made using React, Typescript and Chakra-UI to style it. In addition to it, I have created a Node container with Dockers and built the application in an NGINX server with a self-signed SSL certificate. Below you will find how to run the available scripts and how to build the container in Docker.

## Live demo

`https://delivery-fee-calculator.netlify.app`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## How To Use Docker

### `docker build -t <name> -f Dockerfile .`

Builds the container.

### `docker run -p 443:443 --add-host=host.docker.internal:host-gateway -it <name>`

Runs the container in the port 443.
