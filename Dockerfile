# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json for both backend and frontend
COPY package*.json ./
COPY client/package*.json ./client/

# Install backend dependencies
RUN npm ci --only=production

# Install frontend dependencies
RUN cd client && npm ci --only=production

# Copy the rest of the application code
COPY . .

# Build the React client
RUN cd client && npm run build

# Create a non-root user to run the application
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership of the app directory to the nodejs user
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose the port the app runs on
EXPOSE 8080

# Define the command to run the application
CMD ["npm", "start"]
