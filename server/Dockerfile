#使用nodesjs作为基础镜像
FROM node:20

#设置工作目录
WORKDIR /app

#复制package.json到工作目录
COPY package*.json ./

#复制项目文件，包括prisma文件夹
COPY prisma/schema.prisma ./prisma/schema.prisma

#安装依赖
RUN npm install

#生成Prisma Client
RUN npx prisma generate

#打印node版本
RUN node -v

#复制所有文件到工作目录
COPY . .

#构建项目
RUN npm run build

#暴露端口 (后端运行在8000端口)
EXPOSE 8000

#启动命令
CMD ["node", "dist/main.js"]