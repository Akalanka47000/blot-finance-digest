FROM oven/bun:1.2.2-alpine AS runner

WORKDIR /app

RUN apk add --no-cache --update jq

COPY patches ./patches

COPY packages ./packages

COPY server ./server

COPY package.json bun.lock tsconfig.json ./

RUN echo -e "[install]\ndev=false" > bunfig.toml

RUN bun install --ignore-scripts

EXPOSE 8080

CMD ["sh", "-c",  "bun ./server/src/server.ts"]