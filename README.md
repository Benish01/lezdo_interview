# Project Name -- Lezdo Job Portal

This project consists of a FastAPI backend and a React frontend. This README provides instructions on how to set up and run both the backend and frontend.

## Prerequisites

Before you start, ensure you have the following installed:

- Python 3.10.12
- Node.js 20.10
- npm
- MySql

## Project Structure

  │
  ├── job_portal_api/ # FastAPI backend
  │ ├── App
  │ ├── main.py
  │ ├── requirements.txt
  │ └── .gitignore
  │
  ├── job_portal_ui/ # React frontend
  │ ├── src
  │ ├── public
  │ ├── package.json
  │
  └── README.md


Database setup
  - move to the job_portal_api directory
  - open the `.env` file
  - Replace the DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT with your mysql setup values and save the file .
  


Steps to Run the Fast api
  - move to the job_portal_api directory   `cd job_portal_api`
  - to intsall the dependencies run the command `pip install -r requirements.txt`   
  - after installing all the dependencies, start the app by running
        - `python main.py`    #windows
        - `python3 main.py`   #linux


Steps To Start the React App
  - move to the job_porat_ui directory
  - ensure you are using Node v 20.10.0
  - Run `npm install` in terminal
  - after installing the dependencies Run `npm start` to start the app
