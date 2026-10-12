"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { useDemoAuth } from "../../providers/DemoAuthProvider";
import type { Film } from "../../data/films";
import styles from "./PhotoModal.module.css";

// Типизируем входные свойства компонента.
type PhotoModalProps = {
  film: Film;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClose: () => void;
  returnFocusTo: HTMLElement | null;  
};

// Селектор всех элементов, которые могут получить фокус внутри диалога
const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export default function PhotoModal({
  film,
  isFavorite,
  onToggleFavorite,
  onClose,
  returnFocusTo,
}: PhotoModalProps) {
  // Читает учебное состояние пользователя для условного рендеринга действий
  const { user } = useDemoAuth();

  // Хранит ссылку на корневой элемент диалога для поиска фокусируемых потомков
  const dialogRef = useRef<HTMLDivElement>(null);

  // Хранит ссылку на кнопку закрытия, которая получает начальный фокус при открытии
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Сохраняет исходное значение overflow, чтобы восстановить его при закрытии
    const previousOverflow = document.documentElement.style.overflow;

    // Блокирует прокрутку документа на время открытого модального окна
    document.documentElement.style.overflow = "hidden";

    // Перемещает фокус внутрь диалога сразу после его монтирования
    closeButtonRef.current?.focus();

    // Закрывает модальное окно при нажатии клавиши Escape
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEscape);

    // Cleanup: снимает подписку, восстанавливает прокрутку и возвращает фокус триггеру
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.documentElement.style.overflow = previousOverflow;
      returnFocusTo?.focus();
    };
  }, [onClose, returnFocusTo]);

  // Удерживает клавиатурный фокус внутри диалога при нажатии Tab и Shift+Tab
  function keepFocusInside(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;

    // Собирает все фокусируемые элементы внутри текущего диалога
    const focusable = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
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

  // Рендерит содержимое диалога в document.body через портал,
  // чтобы оверлей отображался поверх любых контейнеров с overflow или z-index
  return createPortal(
    <div
      className={styles.overlay}
      // Закрывает окно при клике непосредственно по затемнённому фону,
      // но не при клике внутри самого диалога
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        // Связывает диалог с его заголовком для вспомогательных технологий
        aria-labelledby="film-modal-title"
        onKeyDown={keepFocusInside}
      >
        {/* Кнопка закрытия получает начальный фокус при открытии окна */}
        <button
          ref={closeButtonRef}
          className={styles.close}
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        >
          ×
        </button>

        {/* Постер фильма выводится через next/image для оптимизации размера и загрузки */}
        <Image
          src={film.image}
          alt={film.imageAlt}
          width={900}
          height={600}
          className={styles.image}
          sizes="(max-width: 700px) calc(100vw - 48px), 720px"
        />

        {/* Идентификатор заголовка совпадает со значением aria-labelledby диалога */}
        <h2 id="film-modal-title">{film.title}</h2>

        <p className={styles.meta}>
          {film.year} · {film.country} · {film.director}
        </p>

        <p>{film.summary}</p>

        <p className={styles.mood}>
          <strong>Настроение:</strong> {film.mood}
        </p>

        {/* Список стриминговых сервисов, где доступен фильм */}
        <section className={styles.streamingSection}>
          <h3 className={styles.streamingTitle}>Доступно на</h3>
          <ul className={styles.streamingList}>
            {film.streaming.map((service) => (
              <li key={service.slug}>
                <a
                  href={service.url}
                  target="_blank"  
                  rel="noopener noreferrer"
                  className={styles.streamingLink}
                  style={{ backgroundColor: service.color }}
                >
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Условное действие: гость видит ссылку, пользователь — кнопку */}
        <div className={styles.actions}>
          {user ? (
            <button
              className={styles.favoriteButton}
              type="button"
              onClick={onToggleFavorite}
            >
              {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
            </button>
          ) : (
            <Link className={styles.loginLink} href="/auth/login">
              Войдите, чтобы использовать избранное →
            </Link>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}