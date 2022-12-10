FROM node:lts-alpine

# Set the working directory
WORKDIR /app

USER root

# Copy app dependencies to container
COPY ./package*.json /app
# Add `/app/node_modules/.bin` to $PATH

ENV PATH ./node_modules/.bin:$PATH

# Install dependencies
RUN npm install
# EXPOSE 9100

CMD npm start