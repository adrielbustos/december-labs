FROM node:16-alpine

# Create app directory
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./
COPY src ./src

EXPOSE 8080

RUN ls -a
RUN yarn install
# RUN tsc
CMD [ "yarn", "run", "dev" ]
# CMD [ "node", "dist/app.js" ]