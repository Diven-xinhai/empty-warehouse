#!/bin/bash

VERSION=1.1.4

 ls -a

 # 镜像仓库地址
IMAGE_NAME="registry.cn-shanghai.aliyuncs.com/qiniao/web-website"

# 容器名称
CONTAINER_NAME="website"

# 1. 拉取最新镜像
echo "拉取最新的 Docker 镜像..."
docker pull $IMAGE_NAME:$VERSION

# 2. 检查并删除旧容器（如果存在）
echo "检查是否有正在运行的容器..."
if [ "$(docker ps -a -q -f name=$CONTAINER_NAME)" ]; then
    echo "停止并删除旧容器..."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

# 3. 启动新的容器，并将端口映射到 3001
echo "启动新的容器..."
docker run -d --name $CONTAINER_NAME -p 3001:3000 $IMAGE_NAME:$VERSION

# 4. 删除旧镜像，只保留最新的版本
echo "删除所有旧镜像，只保留最新的版本..."
docker images --filter=reference=$IMAGE_NAME --format "{{.Repository}}:{{.Tag}}" | tail -n +2 | xargs -r docker rmi

echo "部署完成。新容器正在运行，并映射到宿主机的 3001 端口。"