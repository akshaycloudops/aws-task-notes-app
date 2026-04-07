# AWS Task Notes App

## Overview
This is a simple Node.js notes application deployed on AWS EC2.

## Features
- Add notes
- View notes
- Simple backend using Node.js

## Tech Stack
- Node.js
- Express.js
- AWS EC2
- GitHub

## Project Setup

### Clone repository
git clone https://github.com/your-username/your-repo.git

### Install dependencies
npm install

### Run application
node server.js

App will run on:
http://localhost:3000

## AWS Deployment

- EC2 instance (Ubuntu)
- Public Subnet
- Internet Gateway
- Security Group (Port 3000 open)

Access using:
http://<your-public-ip>:3000

## Folder Structure
- server.js
- package.json
- README.md

## Notes
- Data is not persistent (no database)
- Project created for learning AWS deployment
