# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /src

# Copy package files INCLUDING lockfile
COPY package.json package-lock.json ./

# Install all deps (needed for TypeScript build)
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Verify build output exists
RUN ls -la /src/dist || (echo "Build failed: dist directory not found" && exit 1)


# Stage 2: Production stage
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Copy package files INCLUDING lockfile
COPY package.json package-lock.json ./

# Install prod deps only (deterministic)
# --ignore-scripts skips lifecycle scripts like "prepare" which runs husky (dev dependency)
RUN npm ci --omit=dev --ignore-scripts

# Copy built output (use absolute path from builder stage)
COPY --from=builder /src/dist ./dist

# (Optional but recommended) run as non-root
USER node

EXPOSE 3000

CMD ["node", "dist/index.js"]
