# Use an official Node.js runtime as the base image
FROM node:21.2.0-alpine

# Set the working directory inside the container
WORKDIR /src

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 5001

# Start the Node.js server
CMD ["npm", "run", "dev"]
