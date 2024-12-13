## 1. pnpm run build
## 2. docker build --platform linux/amd64 -t website:1.2.0 . -f Dockerfile
## 3. docker save -o website_1.2.0.tar website:1.2.0

FROM node:20-alpine
ENV HOST 0.0.0.0
RUN mkdir -p /nuxt
COPY .output /nuxt
WORKDIR /nuxt
## fix @nuxt/image [https://github.com/nuxt/image/issues/1210]
RUN npm config set registry https://registry.npmmirror.com
RUN rm -rf server/node_modules/sharp && cd server && npm install sharp@0.33.2
EXPOSE 3000
CMD ["node","server/index.mjs"]

