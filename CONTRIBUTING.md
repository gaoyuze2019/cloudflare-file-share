# 贡献指南

感谢您对 Cloudflare File Share 项目的关注！我们欢迎任何形式的贡献。

## 🤝 如何贡献

### 报告问题

如果您发现了 bug 或有功能建议，请：

1. 检查 [Issues](https://github.com/your-username/g103200-file-share/issues) 确保问题未被报告
2. 创建新的 Issue，详细描述问题或建议
3. 提供相关的错误信息、截图或复现步骤

### 提交代码

1. **Fork 项目**
   ```bash
   git clone https://github.com/your-username/g103200-file-share.git
   cd g103200-file-share
   ```

2. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **本地开发**
   ```bash
   npm install
   npm run dev
   ```

4. **提交更改**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **推送分支**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **创建 Pull Request**

## 📋 开发规范

### 代码风格

- 使用 2 空格缩进
- 使用 ES6+ 语法
- 添加适当的注释
- 保持代码简洁易读

### 提交信息规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

- `feat:` 新功能
- `fix:` 修复bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建或辅助工具变动

### 测试

在提交之前，请确保：

- 代码能够正常运行
- 新功能有相应的测试
- 所有现有测试通过

## 🚀 本地开发

1. **环境要求**
   - Node.js 18+
   - npm 或 yarn
   - Cloudflare 账户

2. **配置**
   ```bash
   # 安装依赖
   npm install
   
   # 启动开发服务器
   npm run dev
   ```

3. **项目结构**
   ```
   ├── functions/          # Cloudflare Pages Functions
   ├── public/            # 静态文件
   ├── wrangler.toml      # Cloudflare 配置
   └── package.json       # 项目配置
   ```

## 🎯 贡献重点

我们特别欢迎以下方面的贡献：

- 🐛 Bug 修复
- 🎨 UI/UX 改进
- 📱 移动端适配优化
- 🔒 安全性增强
- 📊 性能优化
- 🌍 国际化支持
- 📚 文档完善

## 📞 联系我们

如果您有任何问题，可以：

- 创建 Issue
- 发送邮件到 [your-email@example.com]
- 在 Pull Request 中讨论

感谢您的贡献！🙏 