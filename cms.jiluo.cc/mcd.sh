#!/bin/sh

project_name="cms.jiluo.cc"
port="2541"

echo 删除已有镜像
docker rmi $project_name -f

echo 构建新的镜像
docker build -t $project_name .

echo 删除已有的容器
docker rm $project_name -f

echo 构建新的容器
docker run --name $project_name -p $port:80 -d $project_name