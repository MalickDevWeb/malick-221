FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY backend/package*.json ./backend/
COPY shared/package*.json ./shared/

WORKDIR /app
COPY shared ./shared
COPY backend ./backend

WORKDIR /app/backend
RUN npm install
RUN npx prisma generate
RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
