FROM amazon/aws-lambda-nodejs:12
RUN mkdir /app
WORKDIR /app
COPY package.json /app
COPY src /app
RUN echo ls -lha
RUN npm install
RUN npm run build
CMD [ "index.handler" ]