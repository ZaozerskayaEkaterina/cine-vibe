import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import DemoAuthProvider from "./providers/DemoAuthProvider";
// import AppNav from "./ui/AppNav";
import BurgerMenu from "./ui/BurgerMenu/BurgerMenu";
import "./globals.css";

// Шрифт для заголовков
const castileo = localFont({
  src: "./fonts/Castileo-Medium.ttf",
  variable: "--font-castileo",
  display: "swap",
});

// Шрифт для основного текста
const cruinn = localFont({
  src: "./fonts/Cruinn.ttf",
  variable: "--font-cruinn",
  display: "swap",
});

// Метаданные для страницы (title, description) — используются в <head>
export const metadata: Metadata = {
  title: "Cine-Vibe",
  description: "Кино-подборки по настроению",
};

// Корневой макет приложения. Оборачивает все страницы в HTML и BODY, а также в провайдер авторизации
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={`${castileo.variable} ${cruinn.variable}`}>
      <body>
        {/* Провайдер оборачивает всё приложение, чтобы пользователь был доступен везде */}
        <DemoAuthProvider>
          {/* Навигация отображается на всех страницах */}
          {/* <AppNav /> */}
           <BurgerMenu />
          {children}
        </DemoAuthProvider>
      </body>
    </html>
  );
}