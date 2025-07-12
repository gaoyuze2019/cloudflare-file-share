# 🚀 Cloudflare File Share

基于 Cloudflare Pages + Functions + R2 的高性能文件上传与分享服务。

## ✨ 特性

- 🎯 **拖拽上传** - 支持拖拽文件或点击选择
- 📱 **响应式设计** - 完美适配手机和桌面
- 🔄 **批量上传** - 同时上传多个文件
- 📊 **文件管理** - 查看、删除文件，显示存储使用情况
- 🛡️ **安全可靠** - Token 认证，防止滥用
- ⚡ **极速访问** - 全球 CDN 加速
- 💾 **大文件支持** - 最大支持 100MB 文件
- 🎨 **现代界面** - 简洁美观的用户界面
- 📋 **Copy MD 格式** - 一键复制 Markdown 引用格式（核心功能）

## 🛠️ 支持的文件类型

- 📸 **图片**: PNG, JPG, GIF, WebP, SVG, BMP, TIFF
- 📄 **文档**: PDF, TXT, JSON

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/your-username/g103200-file-share.git
cd g103200-file-share
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置 Cloudflare

#### 创建 R2 存储桶
1. 登录 Cloudflare Dashboard
2. 进入 R2 Object Storage
3. 创建一个新的存储桶（例如：`my-file-bucket`）

#### 创建 Pages 项目
1. 进入 Cloudflare Pages
2. 创建一个新项目
3. 连接到你的 GitHub 仓库

#### 配置文件
复制 `wrangler.toml.example` 到 `wrangler.toml` 并填入你的配置：

```bash
cp wrangler.toml.example wrangler.toml
```

编辑 `wrangler.toml` 文件，填入：
- `name`: 你的项目名称
- `UPLOAD_TOKEN`: 你的上传令牌（建议使用强密码）
- `PUBLIC_URL`: 你的域名
- `bucket_name`: 你的 R2 存储桶名称

### 4. 部署

```bash
# 部署到 Cloudflare Pages
./deploy-pages.sh

# 或者使用 npm 命令
npm run deploy
```

### 5. 配置环境变量

在 Cloudflare Dashboard 的 Pages 设置中配置：

**Functions 设置 > 环境变量**：
- `UPLOAD_TOKEN`: 你的上传令牌

**Functions 设置 > R2 存储桶绑定**：
- 变量名：`MY_BUCKET`
- R2 存储桶：你的存储桶名称

## 📋 API 文档

### 上传文件

```bash
POST /upload
Headers:
  X-Auth-Token: your-upload-token
  Content-Type: file-mime-type
  Content-Length: file-size
Body: file-binary-data
```

**响应:**
```json
{
  "success": true,
  "url": "https://g103200-file-share.pages.dev/public-images/filename.ext",
  "filename": "2024-01-01T12-00-00-000Z-uuid.ext",
  "size": 1024,
  "type": "image/png",
  "uploadedAt": "2024-01-01T12:00:00.000Z",
  "markdown": "![filename.ext](https://g103200-file-share.pages.dev/public-images/filename.ext)"
}
```

### 获取文件列表

```bash
GET /list
```

**响应:**
```json
{
  "success": true,
  "files": [
    {
      "filename": "example.png",
      "size": 1024,
      "uploadedAt": "2024-01-01T12:00:00.000Z",
      "url": "https://g103200-file-share.pages.dev/public-images/example.png",
      "type": "image/png",
      "markdown": "![example.png](https://g103200-file-share.pages.dev/public-images/example.png)"
    }
  ],
  "total": 1,
  "totalSize": 1024
}
```

### 删除文件

```bash
POST /delete
Headers:
  X-Auth-Token: your-upload-token
  Content-Type: application/json
Body: {"filename": "filename.ext"}
```

**响应:**
```json
{
  "success": true,
  "message": "Deleted: filename.ext",
  "deletedAt": "2024-01-01T12:00:00.000Z"
}
```

### 访问文件

```bash
GET /public-images/filename.ext
```

直接返回文件内容，支持缓存和 CDN 加速。

## 🔧 项目结构

```
g103200-file-share/
├── functions/              # Cloudflare Pages Functions
│   ├── upload.js          # 文件上传处理
│   ├── list.js            # 文件列表获取
│   ├── delete.js          # 文件删除处理
│   └── public-images/     # 文件访问路由
│       └── [[file]].js    # 动态路由处理文件访问
├── public/                # 静态文件目录
│   └── index.html         # 主页面
├── wrangler.toml          # Cloudflare 配置
├── package.json           # 项目配置
└── deploy-pages.sh        # 部署脚本
```

## 🎯 核心功能：Copy MD 格式

这是本项目的核心功能之一！每个上传的文件都会自动生成 Markdown 引用格式：

```markdown
![filename.ext](https://g103200-file-share.pages.dev/public-images/filename.ext)
```

点击 **Copy MD** 按钮即可一键复制，方便在 Markdown 文档中使用。

## 🛡️ 安全建议

1. **保护上传令牌**: 确保 `UPLOAD_TOKEN` 的安全性
2. **访问控制**: 可以通过 Cloudflare Access 添加额外的访问控制
3. **定期清理**: 定期清理不需要的文件以节省存储空间
4. **监控使用**: 监控存储使用量和请求频率

## 📈 性能优化

- ✅ 使用 Cloudflare Pages Functions 提供边缘计算
- ✅ R2 存储提供全球低延迟访问
- ✅ CDN 缓存加速文件访问
- ✅ 压缩和优化的前端代码
- ✅ 异步文件上传处理

## 🔄 从 Workers 迁移到 Pages

如果你之前使用的是 Cloudflare Workers 版本，现在已经迁移到 Pages + Functions 架构：

1. **更好的开发体验**: 静态文件和 API 分离
2. **更灵活的路由**: 支持动态路由和静态文件服务
3. **更好的性能**: 边缘函数和静态文件分发
4. **更容易维护**: 清晰的项目结构

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

- [Cloudflare Pages](https://pages.cloudflare.com/)
- [Cloudflare Functions](https://developers.cloudflare.com/pages/functions/)
- [Cloudflare R2](https://developers.cloudflare.com/r2/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

---

⭐ 如果这个项目对你有帮助，请给个 Star！

🌐 **在线访问**: https://g103200-file-share.pages.dev 