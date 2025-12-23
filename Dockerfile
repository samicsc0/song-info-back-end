# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /src

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
# Verify build output exists
RUN ls -la /src/dist || (echo "Build failed: dist directory not found" && exit 1)


# Stage 2: Production stage
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts
COPY --from=builder /src/dist ./dist
USER node

EXPOSE 3000

CMD ["node", "dist/index.js"]
