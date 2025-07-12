# 🚀 Cloudflare File Share

> **专为 Markdown 图片/截图托管而生，10GB 免费、长期、稳定、可控！**

## 🏆 项目定位

本项目旨在解决：**你在写 Markdown 文档时，图片（如截图、插图）无法同步给他人**的问题。

- 你可以将图片批量上传到自己的 Cloudflare R2，生成 Markdown 链接，插入文档。
- 10GB 免费额度，几乎永久、全免费、无广告、无第三方依赖。
- 你可以将 Access Token 分享给团队成员，大家共用同一图床。
- **所有上传操作都需要 Access Token，防止被滥用。**

> 适合：技术文档、团队协作、知识库、博客、个人笔记等场景。

---

## ✨ 主要特性

- 🖼️ 拖拽/批量上传图片、文档
- 📋 一键复制 Markdown 格式链接（核心功能）
- 📱 响应式设计，移动端友好
- 🛡️ Access Token 认证，安全可控
- 🗑️ 文件管理（列表、删除、用量统计）
- ⚡ 全球 CDN 加速，R2 存储
- 💾 支持最大 100MB 单文件

---

## ⚠️ 安全与访问说明

- **所有上传/删除操作都需要 Access Token**，默认禁止公开上传，防止被他人滥用。
- 你可以将 Token 分享给可信用户，实现团队共用。
- **在线访问地址**（如 https://g103200-file-share.pages.dev ）仅用于文件访问/预览，**不建议公开宣传为“公共图床”**。
- 如需开放上传，请自行更改 Token 策略并承担风险。

---

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone https://github.com/gaoyuze2019/cloudflare-file-share.git
cd cloudflare-file-share
```

### 2. 安装依赖
```bash
npm install
```
> **依赖说明**
> 本项目依赖极少，`npm install` 主要用于安装 Cloudflare 官方开发工具 wrangler。
> 你可以在 `package.json` 里看到：
> ```json
> "devDependencies": {
>   "wrangler": "^3.0.0"
> }
> ```
> wrangler 用于本地开发、模拟和部署，无需其它依赖。
> 如果你后续需要用到更多 npm 包，也可以通过 `npm install 包名` 安装。

### 3. 配置 Cloudflare
- 创建 R2 存储桶（如 my-image-bucket）
- 创建 Pages 项目，连接 GitHub
- 复制 `wrangler.toml.example` 为 `wrangler.local.toml`，填写你的真实配置

### 4. 设置 Access Token（强烈建议！）
- 在 Cloudflare Pages 项目设置 > Functions > 环境变量，添加：
  - `UPLOAD_TOKEN`：**自定义强密码（如 `A1b2C3d4!@#`，不要用常用密码，也不要泄露）**
- 在本地 `wrangler.local.toml` 也要同步配置
- 你可以将 Token 分享给团队成员

### 5. 绑定 R2 存储桶
- 变量名：`MY_BUCKET`
- 存储桶名：你的 R2 名称

### 6. 启动/部署
```bash
npm run dev   # 本地开发
npm run deploy  # 部署到 Cloudflare Pages
```

---

## 📋 API 文档

### 上传文件（需 Token）
```bash
POST /upload
Headers:
  X-Auth-Token: <your-upload-token>
  Content-Type: file-mime-type
Body: file-binary-data
```

### 获取文件列表
```bash
GET /list
```

### 删除文件（需 Token）
```bash
POST /delete
Headers:
  X-Auth-Token: <your-upload-token>
  Content-Type: application/json
Body: {"filename": "filename.ext"}
```

### 访问文件（公开）
```bash
GET /public-images/filename.ext
```

---

## 🎯 典型用法：Markdown 图床

1. 上传图片，点击 **Copy MD**，自动复制 Markdown 格式：
   ```markdown
   ![xxx.png](https://g103200-file-share.pages.dev/public-images/xxx.png)
   ```
2. 粘贴到你的 Markdown 文档，团队成员/他人只需同步文档即可看到图片。
3. 10GB 免费额度，适合长期存储文档图片。

---

## 🛡️ 安全建议

- **务必设置强 Token，切勿公开 Token。原因如下：**
  1. **防止额度被滥用**：如果你公开 Token，任何人都可以上传文件到你的 R2 存储桶，极易导致 10GB 免费额度被消耗殆尽，甚至产生额外费用。
  2. **防止内容被恶意删除**：拥有 Token 的人可以调用删除接口，删除你所有已上传的文件，造成数据丢失。
- 不建议将上传入口公开宣传为“公共图床”
- 可通过 Cloudflare Access 增加额外访问控制
- 定期清理不需要的文件，节省空间

---

## 📄 许可证

MIT License

---

⭐ 如果这个项目对你有帮助，请给个 Star！

项目主页：[https://github.com/gaoyuze2019/cloudflare-file-share](https://github.com/gaoyuze2019/cloudflare-file-share)
