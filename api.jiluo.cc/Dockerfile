from node:alpine3.16
WORKDIR /usr/local
COPY dist/ /usr/local/dist
COPY node_modules/ /usr/local/node_modules
COPY package.json /usr/local/package.json
EXPOSE 2542/tcp
EXPOSE 2542/udp
CMD PORT=2542 node /usr/local/dist/main.js

# 构建镜像
# sudo docker build -t api.jiluo.cc .

# 构建容器并运行
# sudo docker run --name api.jiluo.cc -p 2542:2542 -d api.jiluo.cc
