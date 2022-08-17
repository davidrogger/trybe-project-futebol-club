FROM node:16.14-alpine
WORKDIR /app-frontend
COPY package*.json ./
# Mesmo que o backend copiando primeiramente somente o package para criar um layer de instalação
RUN npm install
COPY . .
CMD ["npm", "start"]