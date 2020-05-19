FROM node:12.13.1

WORKDIR /app
COPY package.json package.json
RUN npm install && npm install sails -g
COPY . .

COPY ./compose/sails/start-dev.sh start-dev.sh
RUN sed -i 's/\r//' start-dev.sh
RUN chmod +x start-dev.sh

COPY ./compose/sails/start-prod.sh start-prod.sh
RUN sed -i 's/\r//' start-prod.sh
RUN chmod +x start-prod.sh

# CMD ["node","./app.js","--prod"]
# CMD ["node","./app.js"]
