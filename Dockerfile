FROM node:5

COPY . /app

RUN cd /app; npm install;

CMD ["node", "/app/src/app.js"]
