FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig*.json ./
COPY src ./src

RUN npm install

RUN npx prisma generate

RUN npm run build

RUN ls -la /app/dist || echo "DIST FOLDER MISSING!"

EXPOSE 3000

CMD ["node", "dist/main"]