FROM public.ecr.aws/docker/library/node:20-alpine

# Install apk alpine
RUN apk --update --no-cache add curl tzdata

# Set Timezone
RUN ln -sf /usr/share/zoneinfo/Asia/Jakarta /etc/localtime

RUN mkdir -p /app && chown -R node:node /app
ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

COPY ./source .
COPY ./source/index/index.js index.js

# Install Yarn
RUN npm install -g yarn --force
RUN yarn

EXPOSE 5000

RUN NODE_OPTIONS='--experimental-vm-modules' jest healthcheck.test.js --force-exit

CMD ["node", "--loader", "esm-module-alias/loader", "--no-warnings", "index.js"]

# docker build -t app_api:latest -f Dockerfile .
# docker run -p 5000:5000 app_api