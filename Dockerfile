# 制作构建镜像
FROM nginx
# 调整时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && rm -rf /usr/share/nginx/html/*
# 引入nginx配置
COPY default.conf /etc/nginx/conf.d/
# 引入构建文件
COPY ./dist/browser /usr/share/nginx/html