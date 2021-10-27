FROM node:17-alpine


WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci --production
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./config ./config
COPY ./model ./model
COPY ./public ./public
COPY ./routes ./routes
COPY .env .
COPY chessapp.js .
COPY chessboard1.js .


#ADD . /var
#WORKDIR /var

#RUN npm install

EXPOSE 8042
VOLUME ./logs

CMD ["node","chessboard1.js"]