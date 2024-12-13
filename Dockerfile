# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files
COPY pnpm-lock.yaml package.json ./

# Install pnpm globally
RUN npm install -g pnpm

# Install project dependencies
RUN pnpm install

# Install TypeScript globally
RUN pnpm add -g typescript

# Copy the rest of the application code
COPY . .

# Compile the TypeScript project
RUN pnpm build

# Expose the port on which the application will run
EXPOSE 3000

# Start the application
CMD ["node", "dist/app.js"]