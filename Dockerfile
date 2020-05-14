FROM node:10

RUN mkdir -p /src/reservation

WORKDIR /src/reservation

COPY . /src/reservation

RUN npm install

RUN npm install --save -dev nodemon

EXPOSE 3007

CMD [ "npm", "start" ]