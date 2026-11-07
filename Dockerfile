FROM nginx:1.30.6-alpine

LABEL org.opencontainers.image.source="https://github.com/jakubkuceradev/portfolio"

COPY index.html styles.css script.js /usr/share/nginx/html/

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1

EXPOSE 80
