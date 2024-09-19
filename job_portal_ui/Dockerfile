# Use the official Node.js image with version 20.10.0
FROM node:20.10.0

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json /app/
RUN npm install

# Copy the rest of the application
COPY ./public /app/public
COPY ./src /app/src

# Expose the port the app will run on
EXPOSE 3000

# Run npm start when the container launches
CMD ["npm", "start"]
