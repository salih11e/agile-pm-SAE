# Stage 1: Builder
FROM node:18-alpine AS builder
WORKDIR /build
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Runtime
FROM node:18-alpine
WORKDIR /app

# Non-root User
RUN addgroup -g 1000 appgroup && \
    adduser -D -u 1000 -G appgroup appuser

# Dependencies von Builder kopieren
COPY --from=builder --chown=appuser:appgroup /build/node_modules ./node_modules

# App-Code kopieren
COPY --chown=appuser:appgroup . .

USER appuser
EXPOSE 3000

# Health Check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { if (res.statusCode !== 200) process.exit(1); })" || exit 1

ENV NODE_ENV=production
ENV PORT=3000

CMD ["npm", "start"]
