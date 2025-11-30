# 🚀 Nutri Helper

> 一个轻量级的用户脚本，用于增强 [https://nutrimatic.org](https://nutrimatic.org) 。

🌟 快速安装

在浏览器中打开下面的安装链接，用户脚本管理器会提示安装：

🔗 [https://github.com/KoolShow/nutri-helper-vue/releases/download/latest/nutri-helper.user.js](https://github.com/KoolShow/nutri-helper-vue/releases/download/latest/nutri-helper.user.js)

支持的管理器：

- [Tampermonkey](https://www.tampermonkey.net/)
- [Violentmonkey](https://violentmonkey.github.io/)
- [ScriptCat](https://scriptcat.org/)
- ...

安装步骤：

1. 在浏览器中安装一个用户脚本管理器扩展。
2. 打开上面的安装链接，管理器会提示你安装脚本。
3. 启用脚本后，访问 [https://nutrimatic.org](https://nutrimatic.org) 即可看到增强效果。

手机用户：

- 安卓：使用 [Kiwi Browser](https://github.com/kiwibrowser/src.next) [Edge](https://edgemobileapp.microsoft.com/) 等支持用户脚本管理器的浏览器 (暂不支持 [Via](https://viayoo.com/) )
- IOS：使用 Safari (未测试)

✨ 功能简介

- 在 nutrimatic.org 上添加便捷的搜索与结果列表 UI
- 为长结果集提供分页控制
- 采用 Vue 3 构建的轻量前端，以用户脚本形式打包分发

🛠 开发

克隆仓库并运行开发或构建脚本。项目基于 Vite + Vue 3 + TypeScript。

```powershell
pnpm install
pnpm run dev      # 本地开发服务器
pnpm run build    # 构建生产用户脚本
```

⚙️ 构建说明

- 用户脚本配置位于 `vite.config.ts` 中，使用 `vite-plugin-monkey`。userscript 头部包含 `downloadURL` 与 `updateURL`，指向上面给出的 GitHub releases 地址，用于安装与自动更新。

🗺 项目规划

- 打磨搜索结果的 UI/UX
- 添加基础设置面板
- 添加 CI 流水线，自动构建并发布 userscript
- 国际化，支持更多语言
- 为结果添加维基百科卡片预览及搜索跳转等便捷功能

🧩 如何贡献

- 发现问题或有功能建议？请先在仓库中打开 issue。
- 提交 PR 请基于 `main`（或你偏好的分支）新建分支，并在提交前运行 `npx ultracite fix` 保持代码风格一致。

📜 许可证

MIT — 详见仓库中的 `LICENSE` 文件。

❤️ 致谢

本项目采用的样式表由[cl0vis403制作](https://github.com/cl0vis403/nutrimatic_helper_with_ui/blob/main/nutrimatic_helper_ui_night.user.js).
