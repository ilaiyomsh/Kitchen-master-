FROM node:20-alpine

WORKDIR /app

# Copy root workspace files
COPY package.json package-lock.json* ./
COPY shared/package.json ./shared/
COPY server/package.json ./server/

# Install dependencies
RUN npm install --workspace=shared --workspace=server

# Copy source
COPY shared/ ./shared/
COPY server/ ./server/

# Build shared
RUN npm run build -w shared || true

EXPOSE 3001

CMD ["npx", "tsx", "server/src/index.ts"]
