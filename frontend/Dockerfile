FROM node:18

ENV NEXT_PUBLIC_URL_API=http://localhost:4000
# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install
COPY . .

EXPOSE 3000

RUN npm run build

CMD ["npm", "start"]
