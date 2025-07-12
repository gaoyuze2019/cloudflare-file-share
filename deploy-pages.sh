#!/bin/bash

# Cloudflare Pages 部署脚本
echo "🚀 开始部署到 Cloudflare Pages..."

# 检查是否安装了 wrangler
if ! command -v wrangler &> /dev/null; then
    echo "❌ 未找到 wrangler CLI，正在安装..."
    npm install -g wrangler
fi

# 检查是否已登录 Cloudflare
if ! wrangler whoami &> /dev/null; then
    echo "🔑 请先登录 Cloudflare..."
    wrangler login
fi

# 检查 R2 存储桶是否存在
echo "📦 检查 R2 存储桶..."
if ! wrangler r2 bucket list | grep -q "my-image-bucket"; then
    echo "❌ 未找到 R2 存储桶 'my-image-bucket'"
    echo "请确保你的 R2 存储桶已经创建并正确配置"
    exit 1
else
    echo "✅ R2 存储桶 'my-image-bucket' 已存在"
fi

# 部署到 Cloudflare Pages
echo "🚀 部署到 Cloudflare Pages..."
wrangler pages deploy public --project-name=cloudflare-file-share

echo "✅ 部署完成！"
echo "🌐 你的文件分享服务已部署到: https://g103200-file-share.pages.dev"
echo "📋 请确保在 Cloudflare Dashboard 中配置了正确的环境变量和 R2 绑定"
echo ""
echo "需要配置的环境变量："
echo "  - MY_BUCKET (R2 binding): my-image-bucket"
echo "  - UPLOAD_TOKEN: Gbenjamin3#,"
echo ""
echo "如果这是首次部署，请在 Cloudflare Dashboard 的 Pages 设置中配置这些变量。" 