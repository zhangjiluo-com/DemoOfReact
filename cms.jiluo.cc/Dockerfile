FROM nginx:1.24
RUN rm /etc/nginx/conf.d/default.conf
COPY server.conf  /etc/nginx/conf.d/
COPY dist/  /usr/share/nginx/html/
EXPOSE 80

# 构建 pnpm build:alpha

# 构建镜像
# sudo docker build -t cms.jiluo.cc .

# 构建容器并运行
# sudo docker run --name cms.jiluo.cc -p 2451:80 -d www.jiluo.cc
