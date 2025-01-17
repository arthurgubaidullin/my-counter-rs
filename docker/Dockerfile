# syntax=docker/dockerfile:1

ARG RUST_VERSION=1.83
ARG APP_NAME=server
ARG ASSETS=/assets
ARG NODE_VERSION=22


FROM node:${NODE_VERSION}-alpine AS assets

WORKDIR /app

RUN --mount=type=bind,source=web,target=web \
    --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/app/web/dist/ \
    --mount=type=cache,target=/app/web/node_modules/ \
    --mount=type=cache,target=/app/web/.astro/ \
    --mount=type=cache,target=/app/node_modules/ \
    --mount=type=cache,target=/root/.npm \
    npm ci && \
    npm run build -w web && \
    cp -R /app/web/dist/ /dist


FROM rust:${RUST_VERSION}-alpine AS build

ARG APP_NAME
WORKDIR /app

RUN apk add --no-cache clang lld musl-dev git

RUN --mount=type=bind,source=server,target=server \
    --mount=type=bind,source=Cargo.toml,target=Cargo.toml \
    --mount=type=bind,source=Cargo.lock,target=Cargo.lock \
    --mount=type=cache,target=/app/target/ \
    --mount=type=cache,target=/usr/local/cargo/git/db \
    --mount=type=cache,target=/usr/local/cargo/registry/ \
    cargo build -p server --locked --release && \
    cp ./target/release/$APP_NAME /bin/server


FROM alpine:3.18 AS final

ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser
USER appuser

COPY --from=build /bin/server /bin/
COPY --from=assets /dist ${ASSETS}/

EXPOSE 3000

ENV ASSETS=${ASSETS}

CMD ["/bin/server"]
