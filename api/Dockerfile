# Use the Node.js 18 image
FROM node:18

# Install PostgreSQL client
RUN apt-get update && apt-get install -y postgresql-client

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Ensure the schema.prisma file is copied
COPY prisma/schema.prisma prisma/

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Generate Prisma Client
RUN npx prisma generate

# Set the entrypoint
ENTRYPOINT ["/entrypoint.sh"]

# Set the user to node
USER node
