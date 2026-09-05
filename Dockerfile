# syntax=docker/dockerfile:1

# Next.js 14 on Node 22 (Alpine). Three stages so the published image carries
# neither the build toolchain nor the full dependency tree.

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* values are inlined into the bundle at build time, not read at
# runtime, so the data source has to be fixed here. The container only ever
# runs against Postgres.
ENV NEXT_PUBLIC_DATA_SOURCE=postgres
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Never run the server as root: a container breakout costs far more when the
# process already owns the filesystem.
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Grammar is uploaded as PDF and served as one image per page, so the learner
# never receives a document to save. poppler-utils renders the pages
# (pdftoppm, pdfinfo) and libwebp-tools compresses them (cwebp). Together they
# add roughly 20MB to an image that is otherwise about 60MB.
RUN apk add --no-cache poppler-utils libwebp-tools

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
# Without this the standalone server binds to localhost only and the container
# answers nothing from outside.
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
