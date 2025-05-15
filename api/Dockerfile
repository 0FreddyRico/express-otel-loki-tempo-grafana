# Use the official Node.js image as the base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# # Compile TypeScript files to JavaScript as production build
# RUN npm run build

# Expose the port the app runs on
EXPOSE 3242

# Define the command to run the application
CMD ["npm", "run", "dev" ]