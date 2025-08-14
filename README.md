# DeepSeek Chat (Vercel)

一个开箱即用的网页聊天项目：前端静态 `index.html` + Vercel 无服务器函数（/api/chat | /api/chat-stream）代理 DeepSeek 接口，支持 **SSE 流式输出**。

## 一键使用（推荐）
1. **创建 GitHub 仓库**，把本项目文件全部上传。
2. 打开 [vercel.com](https://vercel.com)，**New Project** → 选择该仓库 → 部署。
3. 在 Vercel 项目 **Settings → Environment Variables** 添加：
   - `DEEPSEEK_API_KEY`：你的 DeepSeek API Key（不要放在前端）。
4. 重新部署或点击 **Redeploy**。部署完访问你的域名即可聊天。

> 默认模型：`deepseek-chat`，可在网页右侧下拉切换为 `deepseek-reasoner`。

## 本地开发（可选）
- 安装 [Vercel CLI](https://vercel.com/docs/cli) 后运行：
  ```bash
  npm i
  vercel dev
  # 浏览器打开 http://localhost:3000
  ```
- 在本地调试前，先设置环境变量：
  - macOS/Linux:
    ```bash
    export DEEPSEEK_API_KEY=sk-xxxx
    ```
  - Windows (PowerShell):
    ```powershell
    setx DEEPSEEK_API_KEY "sk-xxxx"
    ```
  然后重新打开一个终端窗口再运行 `vercel dev`。

## 目录结构
```
.
├─ index.html           # 前端 UI（原生 JS）
├─ api/
│  ├─ chat.js           # 非流式接口（可选）
│  └─ chat-stream.js    # 流式 SSE 接口（推荐）
├─ vercel.json          # 指定 Node 运行时等
└─ package.json
```

## 安全说明
- API Key **只在服务端函数中使用**，不会在浏览器暴露。
- 你可在服务端增加鉴权/限流/审计逻辑，或改造为仅允许登录用户调用。

## 常见问题
- **前端 404 / CORS**：通过 Vercel 部署后，前端与 /api 同源，不需要 CORS。
- **没有输出/乱码**：确认浏览器控制台无报错；确认 Vercel 日志里函数正常运行；确认你的 `DEEPSEEK_API_KEY` 正确且额度充足。
- **更换模型或参数**：在 `index.html` 的 `fetch("/api/chat-stream")` 里传入自定义 `model`、`messages` 即可。

---

Made with ♥
