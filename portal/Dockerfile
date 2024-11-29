FROM node:18-alpine
WORKDIR /app
RUN corepack enable
RUN corepack prepare pnpm@7.18.0 --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]