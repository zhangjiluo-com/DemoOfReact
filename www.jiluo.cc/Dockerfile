from node:alpine3.16
WORKDIR /usr/local
COPY .output/ /usr/local
EXPOSE 2540/tcp
EXPOSE 2540/udp
CMD PORT=2540 node /usr/local/server/index.mjs

# 构建镜像
# sudo docker build -t www.jiluo.cc .

# 构建容器并运行
# sudo docker run --name www.jiluo.cc -p 2540:2540 -d www.jiluo.cc
