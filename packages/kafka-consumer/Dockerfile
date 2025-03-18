# Use the official Node.js image from the Docker Hub
FROM node:18-alpine

# Set the working directory
WORKDIR /Users/cristiano_anselmi/projects/notification-engine

# Install TypeScript globally
RUN npm install -g typescript ts-node

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the app code
COPY . .

# Expose the port the app will run on
EXPOSE 8080

# Run the application
CMD ["ts-node", "packages/kafka-consumer/src/main.ts"]
