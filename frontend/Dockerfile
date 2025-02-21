# Step 1: Build the React app using Node.js
FROM node:18-alpine AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Step 4: Install dependencies (using ci for reproducible builds)
RUN npm ci

# Step 5: Copy the rest of the React app code
COPY . . 

# Step 6: Build the React app
RUN npm run build

# Step 7: Serve the React app using Nginx
FROM nginx:alpine

# Step 8: Copy the built React app files to Nginx's directory (Vite default is "dist")
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Copy custom nginx configuration (ensure gzip and caching optimizations)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Step 10: Expose port 80 for Nginx
EXPOSE 80

# Step 11: Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]