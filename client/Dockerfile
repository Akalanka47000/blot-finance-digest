FROM oven/bun:1.2.2-alpine

WORKDIR /app

RUN apk add --no-cache --update nodejs npm icu-data-full jq tzdata

ENV TZ=Asia/Colombo

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY patches ./patches

COPY client ./client

COPY packages ./packages

COPY package.json bun.lock ./

RUN bun install --ignore-scripts

RUN bun --cwd client build

EXPOSE 3000

CMD ["sh", "-c",  "bun --cwd client start"]
