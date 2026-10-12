"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
// useEffect — для ленивой загрузки карты через IntersectionObserver
// useRef — для ссылки на DOM-элемент-плейсхолдер карты
import dynamic from "next/dynamic"; // Динамический импорт компонента PhotoMap с отключением SSR
import { films, type Film } from "../../data/films";
// import PhotoMap from "./PhotoMap";
import PhotoModal from "./PhotoModal";
import styles from "./PlacesGallery.module.css";

// Создаём динамический импорт для PhotoMap.
// Это откладывает загрузку тяжёлого скрипта Яндекс.Карт до момента, когда компонент действительно понадобится 
const PhotoMap = dynamic(() => import("./PhotoMap"), {
  ssr: false, // Отключает рендеринг для компонента PhotoMap, чтобы избежать ошибок при доступе к window и ymaps
  // Пока компонент не загружен, показываем заглушку с текстом "Карта загружается..."
  loading: () => <p className={styles.demoNote}>Карта загружается...</p>,
});

export default function PlacesGallery() {
  // Хранит выбранный фильм, по которому открывается модальное окно
  const [selected, setSelected] = useState<Film | null>(null);

  // Хранит ссылку на кнопку, открывшую модальное окно, для возврата фокуса после закрытия
  const [returnFocusTo, setReturnFocusTo] = useState<HTMLElement | null>(null);

  // Хранит множество идентификаторов фильмов, добавленных в избранное
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(
    () => new Set<string>(),
  );

  // Новое состояние: стала ли карта видимой в области просмотра
  // Пока false — рендерится заглушка; после true — рендерится настоящая PhotoMap
  const [isMapVisible, setIsMapVisible] = useState(false);

  // Ссылка на DOM-элемент-обёртку карты.
  // IntersectionObserver наблюдает именно за этим элементом.
  const mapPlaceholderRef = useRef<HTMLDivElement>(null);

  // Эффект: отслеживаем появление блока карты в области видимости
  useEffect(() => {
    // Если IntersectionObserver не поддерживается — грузим карту асинхронно,
    // чтобы не вызывать setState синхронно в теле эффекта.
    if (!("IntersectionObserver" in window)) {
      queueMicrotask(() => setIsMapVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsMapVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px",
      }
    );

    if (mapPlaceholderRef.current) {
      observer.observe(mapPlaceholderRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Запоминает кнопку-триггер и устанавливает выбранный фильм при открытии из карточки
  function openFromCard(film: Film, button: HTMLButtonElement) {
    setReturnFocusTo(button);
    setSelected(film);
  }

  // Устанавливает выбранный фильм при открытии с карты; возврат фокуса не задаётся
  function openFromMap(film: Film) {
    setReturnFocusTo(null);
    setSelected(film);
  }

  // Сбрасывает выбранный фильм, что приводит к размонтированию модального окна
  function closeModal() {
    setSelected(null);
  }

  // Добавляет идентификатор в избранное или удаляет его, если он уже присутствует
  function toggleFavorite(id: string) {
    setFavoriteIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <>
      {/* Сетка карточек: каждая карточка является семантической кнопкой */}
      <div className={styles.grid}>
        {films.map((film, index) => ( // Добавляем index в map
          <button
            className={styles.card}
            type="button"
            key={film.id}
            // Передаёт текущую кнопку как триггер для последующего возврата фокуса
            onClick={(event) => openFromCard(film, event.currentTarget)}
          >
            {/* Обёртка задаёт пропорции и позиционирование для next/image с fill */}
            <span className={styles.imageWrap}>
              <Image
                src={film.image}
                alt={film.imageAlt}
                fill

                // Приоритизация LCP-изображения: только для первого изображения в галерее
                priority={index === 0}    
                fetchPriority={index === 0 ? "high" : "auto"}  

                // Отключаем lazy loading для первого изображения: LCP-элемент не должен откладываться
                loading={index === 0 ? "eager" : "lazy"}

                sizes="(max-width: 30rem) 100vw, (max-width: 48rem) 45vw, (max-width: 64rem) 30vw, 22vw"
                className={styles.image}
              />
            </span>
            <span className={styles.title}>{film.title}</span>
            <span className={styles.meta}>
              {film.year} · {film.country}
            </span>
            <span className={styles.summary}>{film.summary}</span>
          </button>
        ))}
      </div>

      {/* Предупреждение об учебном характере хранилища избранного */}
      <p className={styles.demoNote}>
        Избранное в этой работе хранится только до обновления страницы.
      </p>

      {/* Контейнер ленивой загрузки карты.
          На этот div ссылается mapPlaceholderRef, и за ним наблюдает IntersectionObserver. */}
      <div ref={mapPlaceholderRef}>
        {isMapVisible ? (
          // Когда карта стала видимой — рендерим настоящий компонент PhotoMap. К этому моменту браузер уже загрузил его скрипт.
          <PhotoMap films={films} onSelect={openFromMap} />
        ) : (
          // Пока карта не видна — показываем заглушку.
          <section className={styles.section} aria-labelledby="map-title-placeholder">
            <h2 id="map-title-placeholder">Карта стран</h2>
            <p className={styles.demoNote}>
              Карта загрузится, когда вы прокрутите до этого места.
            </p>
          </section>
        )}
      </div>

      {/* Модальное окно монтируется только при наличии выбранного фильма */}
      {selected ? (
        <PhotoModal
          film={selected}
          isFavorite={favoriteIds.has(selected.id)}
          onToggleFavorite={() => toggleFavorite(selected.id)}
          onClose={closeModal}
          returnFocusTo={returnFocusTo}
        />
      ) : null}
    </>
  );
}