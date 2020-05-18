FROM node:latest

RUN npm install -g sails grunt npm-check-updates

COPY ./package.json /package.json
RUN npm install

COPY ./compose/sails/start-dev.sh /start-dev.sh
RUN sed -i 's/\r//' /start-dev.sh
RUN chmod +x /start-dev.sh

COPY ./compose/sails/start-proc.sh /start-proc.sh
RUN sed -i 's/\r//' /start-proc.sh
RUN chmod +x /start-proc.sh

WORKDIR /app
