FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm && \
  pnpm --version && \
  pnpm i --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

# Define environment variables
ARG NEXT_PUBLIC_HELLO
ARG NEXT_PUBLIC_WORLD
ARG NEXT_PUBLIC_HELLO_WORLD
ARG HELLO_WORLD
ARG GITHUB_ACCESS_TOKEN

# Write the environment variables to the .env file
RUN echo "NEXT_PUBLIC_HELLO=${NEXT_PUBLIC_HELLO}" >> .env && \
  echo "NEXT_PUBLIC_WORLD=${NEXT_PUBLIC_WORLD}" >> .env && \
  echo "NEXT_PUBLIC_HELLO_WORLD=${NEXT_PUBLIC_HELLO_WORLD}" >> .env && \
  echo "HELLO_WORLD=${HELLO_WORLD}" >> .env && \
  echo "GITHUB_ACCESS_TOKEN=${GITHUB_ACCESS_TOKEN}" >> .env

RUN npm i -g pnpm && \
  pnpm --version && \
  pnpm run build;

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 4936

ENV PORT=4936

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
