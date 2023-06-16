# LetSea

What is LetSea :3
LetSea is an Android-based mobile application that is used as a realtime tracking cargo ships. This project is part of the Bangkit 2023 Capstone Project Batch 1.

Getting Started:

In deployment the app to GCP, here is the step by step:

1. Prequerities:
   NodeJS
   NPM
   Cloud Run

2. How to Run It:
   
   Pull the project on our Github Repo
   
   Run the command inside the repo directory using console to install all the node modules in package.json
   $ npm install

   Create connection inside the database folder and create the database from the sql we have exported.

   Run the command below to build the docker
   docker build -t gcr.io/${PROJECT_ID}/your-name-app .

   Then we need to push the docker image we have built, we run it with the command below
   docker push gcr.io/${PROJECT_ID}/your-name-app

   After that, we deploy the docker image to Cloud Run
   gcloud run deploy --image gcr.io/${PROJECT_ID}/your-name-app --platform managed

#API Architecture


