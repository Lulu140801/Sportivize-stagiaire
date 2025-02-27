FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install --production

ENV MONGO_URI=mongodb://SportTournament:ixk43TmBN522b2LL4Rxu@mongodb:27017/Sportivize
ENV PORT 3000


CMD ["node","server.js"]

EXPOSE 3000