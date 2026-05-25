# 项目上下文

### 版本技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4

## 项目概述

濒危生物趣味交互科普网页应用——以沉浸式场景交互体验和盲盒式解锁玩法为主。用户在秘境森林和深海海域两个场景中，通过点击荧光光斑或渐变气泡来解锁濒危物种科普资料。

## 目录结构

```
├── public/                     # 静态资源
├── scripts/                    # 构建与启动脚本
├── src/
│   ├── app/
│   │   ├── globals.css         # 全局样式与自定义动画
│   │   ├── layout.tsx          # 根布局
│   │   ├── page.tsx            # 主页面（场景切换、缩放、弹窗状态管理）
│   │   └── ...
│   ├── components/
│   │   ├── forest-scene.tsx    # 森林场景（背景层、雾气、光斑、落叶、萤火虫）
│   │   ├── ocean-scene.tsx     # 海洋场景（海底地貌、水流、气泡、鱼影、涟漪）
│   │   ├── species-card.tsx    # 物种科普卡片弹窗（档案/影像双标签页）
│   │   └── ui/                 # shadcn/ui 组件库
│   ├── data/
│   │   └── species.ts          # 34种濒危物种数据（森林15种 + 海洋19种）
│   ├── hooks/
│   └── lib/
├── DESIGN.md                   # 设计规范（色彩、字体、动效、交互规范）
├── next.config.ts
├── package.json
└── tsconfig.json
```

## 核心交互逻辑

1. **场景切换**：右下角胶囊按钮切换「秘境森林」/「深海海域」，交叉淡入淡出 + 缩放过渡
2. **缩放浏览**：鼠标滚轮缩放视角（0.6x ~ 2.5x），缩放后可拖拽平移
3. **盲盒解锁**：点击荧光光斑（森林）或渐变气泡（海洋）→ 载体动画消失 → 弹出物种科普卡片
4. **物种卡片**：双标签页（物种档案 / 影像记录），ESC 或点击遮罩关闭

## 关键文件定位

| 功能 | 文件 | 核心内容 |
|------|------|----------|
| 主交互状态 | `src/app/page.tsx` | 场景切换、缩放/平移、弹窗控制 |
| 森林场景 | `src/components/forest-scene.tsx` | 山林剪影、雾气Canvas、光斑漂浮、落叶、萤火虫 |
| 海洋场景 | `src/components/ocean-scene.tsx` | 海底地形、焦散Canvas、气泡、鱼影、涟漪 |
| 物种卡片 | `src/components/species-card.tsx` | 磨砂玻璃卡片、档案/影像标签页、保护等级条 |
| 物种数据 | `src/data/species.ts` | 28种濒危物种完整数据（森林15+海洋13）含AI生成图片URL |
| 动画定义 | `src/app/globals.css` | 光斑/气泡漂浮、雾气漂移、落叶、涟漪等关键帧 |
| 设计规范 | `DESIGN.md` | 色彩体系、动效规范、交互逻辑、设计禁忌 |

## 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。

## 开发规范

### 编码规范

- 默认按 TypeScript `strict` 心智写代码；优先复用当前作用域已声明的变量、函数、类型和导入，禁止引用未声明标识符或拼错变量名。
- 禁止隐式 `any` 和 `as any`；函数参数、返回值、解构项、事件对象、`catch` 错误在使用前应有明确类型或先完成类型收窄，并清理未使用的变量和导入。

### next.config 配置规范

- 配置的路径不要写死绝对路径，必须使用 path.resolve(__dirname, ...)、import.meta.dirname 或 process.cwd() 动态拼接。

### Hydration 问题防范

1. 严禁在 JSX 渲染逻辑中直接使用 typeof window、Date.now()、Math.random() 等动态数据。**必须使用 'use client' 并配合 useEffect + useState 确保动态内容仅在客户端挂载后渲染**；同时严禁非法 HTML 嵌套（如 <p> 嵌套 <div>）。
2. **禁止使用 head 标签**，优先使用 metadata

### 场景组件注意事项

- 场景组件均为 `'use client'`，因为依赖 Canvas API、鼠标事件和浏览器渲染
- 雾气/焦散效果使用 Canvas 2D API，在 useEffect 中管理动画帧，需在组件卸载时清理
- 光斑/气泡的漂浮参数通过 useMemo 预生成，避免每次渲染重新计算
- CSS 自定义属性通过 `as React.CSSProperties` 类型断言传递

## UI 设计与组件规范

- 采用自定义沉浸式UI，不依赖 shadcn/ui 组件（因为全屏场景无传统表单/列表需求）
- 磨砂玻璃效果：`backdrop-filter: blur(24px)` + 半透明底色
- 圆角统一 20px（卡片）、16px（按钮）、12px（小容器）
- 字体：PingFang SC / Noto Sans SC，纤细圆润无衬线体
