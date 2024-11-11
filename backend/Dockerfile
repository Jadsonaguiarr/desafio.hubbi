FROM node:18

WORKDIR /app

# Copiar apenas package.json e package-lock.json primeiro para instalar as dependências
COPY package.json package-lock.json ./

RUN npm install

# Copiar o restante do código
COPY . .

# Rodar o comando para gerar os arquivos do Prisma
RUN npx prisma generate

EXPOSE 4000

CMD ["npx", "tsx", "watch", "src/server.ts"]
