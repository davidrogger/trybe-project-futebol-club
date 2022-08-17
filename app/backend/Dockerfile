FROM node:16.14-alpine
WORKDIR /app-backend
COPY package*.json ./
# Copiando primeiramente somente o package para criar um layer de instalação
RUN npm install
COPY . .
CMD ["npm", "start"]