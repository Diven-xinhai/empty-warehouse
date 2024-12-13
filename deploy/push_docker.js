import { exec } from "node:child_process";
import fs from "node:fs";

async function execBuild() {
  try {
    // 检查 Docker 环境
    try {
      await checkDockerEnv();
    } catch (err) {
      throw new Error("× Docker error: 未检测到 Docker 环境，请开启或安装 Docker");
    }

    const pkgFile = fs.readFileSync("package.json", "utf8");
    const pkg = JSON.parse(pkgFile);
    const version = pkg.version;
    
    // 设置环境变量
    const fileName = "website";

    console.log("正在构建 Docker 镜像...");
    // 构建 Docker 镜像
    try {
      await executeCommand(`docker build --platform linux/amd64 -t ${fileName}:${version} .`);
      console.log("√ Docker 镜像构建成功！");
    } catch (err) {
      throw new Error("× Docker 镜像构建失败，请检查 Dockerfile 或环境配置" + err);
    }

    console.log("正在打 Docker 镜像tag...");
    // 打 tag
    try {
      await executeCommand(`docker tag ${fileName}:${version} registry.cn-shanghai.aliyuncs.com/qiniao/web-website:${version}`);
      console.log("√ Docker 镜像tag打完");
    } catch (err) {
      throw new Error("× Docker tag 打包失败");
    }

    console.log("登陆docker....");
    // 登陆docker
    try {
      await executeCommand(`docker login --username=山东青鸟工业互联网有限公司 --password=Qiniao123@ registry.cn-shanghai.aliyuncs.com`);
      console.log("√ 登陆成功");
    } catch (err) {
      throw new Error("× Docker 登陆失败，请检查地址、用户名、密码是否正确");
    }

    console.log("正在推送镜像到阿里云镜像仓库....");
    // 推送docker镜像
    try {
      await executeCommand(`docker push registry.cn-shanghai.aliyuncs.com/qiniao/web-website:${version}`);
      console.log("√ 镜像推送成功");
    } catch (err) {
      throw new Error("× Docker 镜像推送失败，请检查镜像名称或地址是否正确");
    }

    console.log("正在删除本地镜像....");
    // 删除本地docker镜像
    try {
      await executeCommand(`docker rmi registry.cn-shanghai.aliyuncs.com/qiniao/web-website:${version}`);
      await executeCommand(`docker rmi ${fileName}:${version}`);
      console.log("√ 本地镜像删除成功");
    } catch (err) {
      throw new Error("× Docker 本地镜像删除失败" + err);
    }

  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

/**
 * @description: 命令行操作封装
 * @param {*} command
 */
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * @description: 判断docker环境是否正常
 */
async function checkDockerEnv() {
  try {
    await executeCommand("docker version");
  } catch (err) {
    throw err;
  }
}

execBuild().catch((err) => {
  console.error("× 执行构建过程时出错:", err);
  process.exit(1);
});
