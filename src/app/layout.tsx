import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: '秘境生灵 · 濒危生物趣味交互科普',
  description:
    '沉浸式探索濒危生物的神秘世界，在秘境森林和深海海域中发现隐藏的珍稀生灵，解锁盲盒式物种科普。',
  keywords: [
    '濒危生物',
    '生态保护',
    '交互科普',
    '沉浸式体验',
    '野生动物',
    '海洋生物',
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="zh-CN">
      <body className={`antialiased`}>
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}
