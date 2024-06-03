#!/bin/sh

# Wait until PostgreSQL is ready
while ! pg_isready -h postgres -U ${POSTGRES_USER}; do
  sleep 2
done

npx prisma generate

# Run Prisma migrations
npx prisma migrate deploy

# Start the application
npm run start:dev
