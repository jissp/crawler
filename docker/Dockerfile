FROM node:20.9.0-alpine3.18 as builder

WORKDIR /app

# Global Package
COPY ./package.json ./package.json

# Sub App Package

RUN npm install

COPY . .

RUN npm run build:crawler

FROM node:20.9.0-alpine3.18 as runner

RUN npm install -g pm2

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json

EXPOSE 3000

ENTRYPOINT ["sh", "-c", "npm run start:crawler:production"]