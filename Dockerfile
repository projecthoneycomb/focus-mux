FROM node:12.6.0

RUN apt update
RUN apt install -y ffmpeg

WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet

COPY . .
RUN mkdir media
RUN mkdir public

ENTRYPOINT ["node", "index.js"]
