FROM node


WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .


#ADD . /var
#WORKDIR /var

#RUN npm install

EXPOSE 8042
VOLUME ./logs

CMD ["node","chessboard1.js"]