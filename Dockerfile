FROM node:21-alpine3.18
WORKDIR /app

ARG NEXT_PUBLIC_AXIOS_BASE_URL
ENV NEXT_PUBLIC_AXIOS_BASE_URL=${NEXT_PUBLIC_AXIOS_BASE_URL}

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run build
CMD [ "npm", "start" ]