FROM node:lts

COPY . /app
WORKDIR /app

EXPOSE 1515
CMD ["node", "app.js"]