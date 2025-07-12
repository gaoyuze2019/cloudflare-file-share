# 🚀 项目设置说明

## 本地开发设置

### 1. 克隆项目
```bash
git clone https://github.com/YOUR_USERNAME/g103200-file-share.git
cd g103200-file-share
```

### 2. 安装依赖
```bash
npm install
```

### 3. 配置本地开发环境
```bash
# 复制配置文件模板
cp wrangler.toml.example wrangler.local.toml

# 编辑配置文件，填入你的实际信息
# - name: 你的 Cloudflare Pages 项目名称
# - UPLOAD_TOKEN: 你的上传令牌
# - PUBLIC_URL: 你的域名
# - bucket_name: 你的 R2 存储桶名称
```

### 4. 启动本地开发服务器
```bash
npm run dev
```

服务器将在 `http://localhost:8788` 启动。

## 部署到 Cloudflare Pages

### 1. 创建 Cloudflare Pages 项目
1. 登录 Cloudflare Dashboard
2. 进入 Pages 部分
3. 创建新项目，连接到你的 GitHub 仓库

### 2. 配置环境变量
在 Cloudflare Pages 项目设置中：

**环境变量**：
- `UPLOAD_TOKEN`: 你的上传令牌

**R2 存储桶绑定**：
- 变量名：`MY_BUCKET`
- 存储桶：你的 R2 存储桶名称

### 3. 部署
推送代码到 GitHub 后，Cloudflare Pages 会自动部署。

## 故障排除

### 本地开发错误："Cannot read properties of undefined (reading 'list')"
这通常是因为 R2 存储桶绑定配置问题。确保：
1. `wrangler.local.toml` 文件存在且配置正确
2. 使用 `npm run dev` 命令启动（它会自动使用本地配置文件）

### 部署后无法访问文件
检查 Cloudflare Pages 项目中的环境变量和 R2 绑定是否正确配置。

## 安全提醒

- 永远不要将 `wrangler.local.toml` 提交到 Git 仓库
- 使用强密码作为 `UPLOAD_TOKEN`
- 定期更换上传令牌 