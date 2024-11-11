FROM node:18

WORKDIR /app

# Copiar apenas o package.json e package-lock.json primeiro para instalar dependências
COPY package.json package-lock.json ./

RUN npm install

# Copiar os outros arquivos do projeto depois
COPY . .

RUN npx prisma generate

EXPOSE 4000

# Usar npx para garantir que a dependência tsx será usada corretamente
CMD ["npx", "tsx", "watch", "src/server.ts"]
