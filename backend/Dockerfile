# Use the official Node.js 16 image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if it exists)
COPY package*.json ./

# Install the dependencies inside the container
RUN npm install

# Copy the rest of your app files to the container
COPY . .

# Expose the port your app will run on
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
