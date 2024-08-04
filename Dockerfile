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

ENV NODE_ENV=production
RUN bun test
RUN bun run make:swagger
RUN bun run build

FROM base as release

COPY --from=prerelease /usr/src/app/target/* .
COPY --from=prerelease /usr/src/app/public ./public/
COPY --from=prerelease /usr/src/app/templates ./templates/

ENV NODE_ENV=production

USER bun
EXPOSE 3000/tcp
CMD ["bun", "run", "server.js"]
