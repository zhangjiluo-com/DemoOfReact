#!/bin/sh

project_name="www.jiluo.cc"
port="2540"

echo 删除已有镜像
docker rmi $project_name -f

echo 构建新的镜像
docker build -t $project_name .

echo 删除已有的容器
docker rm $project_name -f

echo 构建新的容器
docker run --name $project_name -p $port:2540 -d $project_name

# 如果改了 nginx

# sudo nginx -t
# sudo nginx -s reload