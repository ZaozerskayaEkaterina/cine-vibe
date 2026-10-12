"use client"; // Обязательная директива: клиентский компонент для работы с хуками usePathname и useDemoAuth

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDemoAuth } from "../providers/DemoAuthProvider";

// Структура пунктов навигации
const navLinks = [
  { href: "/start", label: "Главная" },
  { href: "/catalog", label: "Каталог" },  
  { href: "/gallery", label: "Галерея" },
  { href: "/about", label: "О проекте" },
  { href: "/cabinet", label: "Кабинет" },
];

/**
 * Вспомогательная функция для определения активного пункта меню.
 * @param pathname - текущий путь из URL
 * @param href - целевая ссылка
 */
function isActive(pathname: string, href: string): boolean {
  if (href === "/start") {
    return pathname === "/start" || pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);  // Слэш гарантирует, что это именно вложенный путь, а не другое слово, начинающееся так же
}

export default function AppNav() {
  // Получение текущего адреса страницы для подсвечивания активного пункта меню
  const pathname = usePathname();
  
  // Извлечение состояния текущего пользователя и функцию выхода из контекста
  const { user, logout } = useDemoAuth();

  return (
    <header className="site-header">
      {/* Логотип приложения */}
      {/* Ссылка на главную страницу через "/" */}
      <Link className="brand" href="/">  
        Cine-Vibe
      </Link>

      {/* Основное навигационное меню */}
      <nav aria-label="Основная навигация">
        <ul className="nav-list">
          {navLinks.map((link) => { const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                {/* Добавляем класс "active" для активного пункта меню */}
                {/* Ссылка на соответствующую страницу */}
                {/* Атрибут для доступности: указывает, что это текущая страница */}
                <Link
                  className={`nav-link ${active ? "active" : ""}`}  
                  href={link.href}  
                  aria-current={active ? "page" : undefined}  
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Блок состояния пользователя (Гость или Авторизован) */}
      <div className="auth-status-block">
        {user ? (
          // Отображение для вошедшего пользователя
          <div className="auth-summary">
            <span className="user-name">👤 {user.name}</span>
            <button type="button" className="logout-btn" onClick={logout}>
              Выйти
            </button>
          </div>
        ) : (
          // Отображение для гостя
          <Link className="login-link" href="/auth/login">
            Войти
          </Link>
        )}
      </div>
    </header>
  );
}