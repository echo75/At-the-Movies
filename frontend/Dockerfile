# File ilustrating the setup of the production environment
FROM node:alpine

ENV NODE_ENV=production

WORKDIR /app

# Add package.json and package-lock.json to the container
ADD package.json package-lock.json ./

# Install dependencies
RUN npm install

# Add the rest of the files
ADD index.html /app/index.html
ADD vite.config.js /app/vite.config.js
ADD vitest.config.js /app/vitest.config.js
ADD public /app/public
ADD src /app/src

# Expose the port that the app will run on
EXPOSE 5173

# Run the app
CMD ["sh", "-c", "npm run dev -- --port $PORT"]
