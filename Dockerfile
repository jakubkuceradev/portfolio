# Build stage runs on the build host's platform; its output is static files.
FROM --platform=$BUILDPLATFORM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Typecheck, tests (including the skill-evidence content check) and Vite build.
RUN npm run build

FROM caddy:2.11.9-alpine

LABEL org.opencontainers.image.source="https://github.com/jakubkuceradev/portfolio"

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1

EXPOSE 80
