# ---- Build stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# Copy only what we need to build
COPY package.json package-lock.json* ./
COPY tsconfig.json tsconfig.build.json jest.config.ts ./
COPY src ./src

# Use npm INSIDE the container to simplify
RUN npm install
RUN npm run build

# ---- Runtime stage ----
FROM node:20-alpine

WORKDIR /app

# Only production deps
COPY package.json package-lock.json* ./
RUN npm install --only=production

# Copy built files
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
