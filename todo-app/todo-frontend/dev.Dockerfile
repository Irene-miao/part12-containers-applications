FROM node:16

WORKDIR /usr/src/app

COPY . .

# change npm ci to npm install since in development mode
RUN npm install

# npm start is command to start application in development mode
CMD ["npm", "start"]
