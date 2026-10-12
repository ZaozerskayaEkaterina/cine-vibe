"use client"; // Директива указывает, что это Client Component — есть состояние, эффекты, refs

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { useDemoAuth } from "../../providers/DemoAuthProvider";
import styles from "./styles.module.css";

// Пункты меню единым массивом — позволяет добавлять разделы без правки JSX
const links = [
  { href: "/start", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/gallery", label: "Галерея" },
  { href: "/about", label: "О проекте" },
  { href: "/cabinet", label: "Кабинет" },
];

// Селектор элементов, которые могут получить фокус внутри панели меню
const menuFocusableSelector = [
  "a[href]",
  "button:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

// Определяет, соответствует ли текущий pathname данному пункту меню;
// корневой маршрут /start считается активным и на /
function isActive(pathname: string, href: string): boolean {
  if (href === "/start") {
    return pathname === "/start" || pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function BurgerMenu() {
  // Читает текущий путь для выделения активного пункта меню
  const pathname = usePathname();

  // Читает учебное состояние пользователя для условного рендеринга блока авторизации
  const { user, logout } = useDemoAuth();

  // Хранит признак открытости панели меню
  const [open, setOpen] = useState(false);

  // Хранит ссылку на кнопку открытия меню для возврата фокуса после закрытия
  const openButtonRef = useRef<HTMLButtonElement>(null);

  // Хранит ссылку на кнопку закрытия меню, которая получает начальный фокус при открытии
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Хранит ссылку на панель меню для поиска фокусируемых потомков
  const panelRef = useRef<HTMLElement>(null);

  // Блокирует прокрутку документа, перемещает фокус на кнопку закрытия,
  // подписывается на Escape и возвращает фокус на кнопку открытия при закрытии
  useEffect(() => {
    if (!open) return;

    // Сохраняет исходное значение overflow, чтобы восстановить его при закрытии
    const previousOverflow = document.documentElement.style.overflow;

    // Запоминает кнопку открытия до того, как фокус уйдёт внутрь панели
    const openButton = openButtonRef.current;

    // Блокирует прокрутку страницы на время открытого меню
    document.documentElement.style.overflow = "hidden";

    // Перемещает фокус внутрь панели сразу после её монтирования
    closeButtonRef.current?.focus();

    // Закрывает меню при нажатии клавиши Escape
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", handleEscape);

    // Cleanup: снимает подписку, восстанавливает прокрутку и возвращает фокус триггеру
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.documentElement.style.overflow = previousOverflow;
      openButton?.focus();
    };
  }, [open]);

  // Сбрасывает состояние открытости, что приводит к размонтированию панели
  function closeMenu() {
    setOpen(false);
  }

  // Удерживает клавиатурный фокус внутри панели при нажатии Tab и Shift+Tab
  function keepFocusInside(event: ReactKeyboardEvent<HTMLElement>) {
    if (event.key !== "Tab") return;

    // Собирает все фокусируемые элементы внутри текущей панели
    const focusable = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>(menuFocusableSelector) ?? [],
    );

    // Если фокусируемых элементов нет, блокирует стандартное поведение Tab
    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    // При Shift+Tab на первом элементе переносит фокус на последний
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    // При Tab на последнем элементе переносит фокус на первый
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <>
      {/* Кнопка открытия меню: сообщает состояние через aria-expanded
          и связывает панель через aria-controls */}
      <button
        ref={openButtonRef}
        className={styles.openButton}
        type="button"
        aria-label="Открыть меню"
        aria-expanded={open}
        aria-controls="main-menu-panel"
        onClick={() => setOpen(true)}
      >
        {/* Иконка скрыта от вспомогательных технологий — label кнопки достаточен */}
        <span aria-hidden="true">≡</span>
      </button>

      {/* Панель меню всегда в DOM — открытие и закрытие анимируются через классы */}
      <div
        className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
      >
      <section
        ref={panelRef}
        id="main-menu-panel"
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Основное меню"
        onKeyDown={keepFocusInside}
      >
            <div className={styles.header}>
              {/* Логотип-ссылка закрывает меню при переходе на главную */}
              <Link href="/start" onClick={closeMenu}>
                Cine-Vibe
              </Link>

              {/* Кнопка закрытия получает начальный фокус при открытии панели */}
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Закрыть меню"
                onClick={closeMenu}
              >
                ×
              </button>
            </div>

            <nav aria-label="Разделы приложения">
              <ul className={styles.list}>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      // Сообщает вспомогательным технологиям об активном пункте меню
                      aria-current={isActive(pathname, link.href) ? "page" : undefined}
                      // Закрывает меню при выборе любого пункта навигации
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Блок авторизации: показывает имя и кнопку выхода для пользователя
                или ссылку на вход для гостя */}
            <div className={styles.authRow}>
              {user ? (
                <>
                  <span>Пользователь: {user.name}</span>
                  <button
                    type="button"
                    onClick={() => {
                      // Сбрасывает учебное состояние пользователя и закрывает меню
                      logout();
                      closeMenu();
                    }}
                  >
                    Выйти
                  </button>
                </>
              ) : (
                // Гость получает ссылку на страницу входа
                <Link href="/auth/login" onClick={closeMenu}>
                  Войти
                </Link>
              )}
            </div>
          </section>
        </div>
    </>
  );
}