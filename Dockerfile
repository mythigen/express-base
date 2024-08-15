FROM oven/bun AS base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun i --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun i --frozen-lockfile --production

FROM install AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# RUN bun test

ENV NODE_ENV=production
RUN bun run make:swagger
RUN bun run build

RUN ls /usr/src/app/target

FROM base as release

WORKDIR /usr/app/

COPY --from=prerelease /usr/src/app/target/ ./
COPY --from=prerelease /usr/src/app/static ./static/
COPY --from=prerelease /usr/src/app/views ./views/
COPY --from=prerelease /usr/src/app/__logs__ ./__logs__/
COPY --from=prerelease /usr/src/app/src/routes ./routes/

RUN ls

ENV NODE_ENV=production

# USER bun
EXPOSE 3000/tcp
CMD ["bun", "run", "server.js"]
