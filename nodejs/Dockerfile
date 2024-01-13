FROM node:16-alpine

# Create app directory
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

# Install app dependencies
COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 80

RUN npm run-script build

CMD ["npm", "start"]
