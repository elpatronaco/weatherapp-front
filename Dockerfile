FROM node:15.8.0-alpine3.10

WORKDIR /usr/src/app

COPY package.json .

RUN apk update && \
    apk upgrade && \
    npm i --g npm && \
    npm i -g serve \
    npm i

ADD . /usr/src/app

RUN npm run build && \
    rm -r /usr/src/app/node_modules/ && \
    rm -r /usr/src/app/src/ && \
    npm i --only=production \ 
    npm run serve

EXPOSE 80

CMD ["npm", "start"]