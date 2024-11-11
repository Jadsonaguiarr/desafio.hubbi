FROM node:18

WORKDIR /app

COPY package*.json ./
# Usar npm ci para garantir que as dependências sejam instaladas corretamente
RUN npm ci

RUN npm list --depth=0

COPY . .

RUN npm run build

RUN npx prisma generate

EXPOSE 4000

CMD ["node", "dist/server.js"]
