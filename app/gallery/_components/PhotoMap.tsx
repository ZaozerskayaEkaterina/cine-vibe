"use client";

// Отмечает границу клиентского модуля: компонент использует эффекты, refs и браузерные API

import { useEffect, useRef, useState } from "react";
import type { Film } from "../../data/films";
import styles from "./PhotoMap.module.css";

// Координаты точки на карте в формате [широта, долгота]
type Coordinates = [number, number];

// Описывает метку карты с поддержкой подписки на события
type YandexPlacemark = {
  events: {
    add: (eventName: string, handler: () => void) => void;
  };
};


// Описывает карту с контейнером, коллекцией геообъектов и методом destroy
type YandexMap = {
  container: {
    fitToViewport: () => void;   // Метод пересчёта размеров. Вызывается из ResizeObserver
  };
  geoObjects: {
    add: (placemark: YandexPlacemark) => void;  // Метод добавления метки на карту
  };
  destroy: () => void;
};

// Описывает API Яндекс Карт с конструктором карты, метки и методом ready
type YandexMapsApi = {
  ready: (callback: () => void) => void;
  Map: new (
    container: HTMLElement,
    state: { center: Coordinates; zoom: number; controls: string[] },
  ) => YandexMap;
  Placemark: new (
    coordinates: Coordinates,
    properties: { hintContent: string; balloonContent: string },
    options: { preset: string; iconColor: string },
  ) => YandexPlacemark;
};

// Расширяет тип Window свойством ymaps, которое добавляет внешний скрипт
declare global {
  interface Window {
    ymaps?: YandexMapsApi;
  }
}

// Идентификатор тега script для предотвращения повторного добавления в DOM
const scriptId = "cine-vibe-yandex-maps";

// Кешируемый промис загрузки API: гарантирует единственную загрузку скрипта
let mapsPromise: Promise<YandexMapsApi> | null = null;

// Загружает скрипт Яндекс Карт один раз и ожидает готовности API через ymaps.ready
function loadMaps(apiKey: string): Promise<YandexMapsApi> {
  // Если API уже загружен, сразу ожидает сигнала готовности и возвращает объект
  if (window.ymaps) {
    return new Promise((resolve) => {
      window.ymaps?.ready(() => resolve(window.ymaps as YandexMapsApi));
    });
  }

  // Возвращает существующий промис, если загрузка уже запущена
  if (mapsPromise) return mapsPromise;

  mapsPromise = new Promise((resolve, reject) => {
    // Вызывается после загрузки скрипта: проверяет наличие ymaps и ожидает ready
    function resolveWhenReady() {
      if (!window.ymaps) {
        mapsPromise = null;
        reject(new Error("Yandex Maps API is unavailable"));
        return;
      }
      window.ymaps.ready(() => resolve(window.ymaps as YandexMapsApi));
    }

    // Если скрипт уже присутствует в DOM, подписывается на его события без повторного добавления
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", resolveWhenReady, { once: true });
      existing.addEventListener(
        "error",
        () => {
          mapsPromise = null;
          reject(new Error("Map script error"));
        },
        { once: true },
      );
      return;
    }

    // Создаёт тег script и добавляет его в head для асинхронной загрузки API
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${encodeURIComponent(apiKey)}&lang=ru_RU`;
    script.async = true;
    script.addEventListener("load", resolveWhenReady, { once: true });
    script.addEventListener(
      "error",
      () => {
        // Сбрасывает промис при ошибке, чтобы следующий вызов повторил загрузку
        mapsPromise = null;
        reject(new Error("Map script error"));
      },
      { once: true },
    );
    document.head.appendChild(script);
  });

  return mapsPromise;
}

type PhotoMapProps = {
  films: Film[];
  onSelect: (film: Film) => void;
};

export default function PhotoMap({ films, onSelect }: PhotoMapProps) {
  // Хранит ссылку на DOM-контейнер, в котором Яндекс Карты создаёт canvas карты
  const containerRef = useRef<HTMLDivElement>(null);

  // Хранит статус загрузки карты для условного рендеринга сообщений
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  // Читает ключ API из переменной окружения с префиксом NEXT_PUBLIC_
  const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY ?? "";

  // Флаг отсутствия ключа: при noKey карта не загружается и показывается подсказка
  const noKey = !apiKey;

  useEffect(() => {
    // Прерывает выполнение эффекта, если ключ не задан
    if (noKey) return;
    if (!containerRef.current || films.length === 0) return;

    // Флаг размонтирования: предотвращает обновление состояния после cleanup
    let disposed = false;

    // Хранит экземпляр карты для вызова destroy в cleanup
    let map: YandexMap | null = null;
    
    // Хранит экземпляр ResizeObserver для пересчёта размеров карты при изменении контейнера
    let resizeObserver: ResizeObserver | null = null;  

    // Асинхронно загружает API, создаёт карту и добавляет метки фильмов
    async function buildMap() {
      try {
        const ymaps = await loadMaps(apiKey);

        // Проверяет, не был ли компонент размонтирован за время ожидания промиса
        if (disposed || !containerRef.current) return;

        // Центрирует карту на координатах первого фильма в массиве
        const first = films[0];
        map = new ymaps.Map(containerRef.current, {
          center: [first.latitude, first.longitude],
          zoom: 3,
          controls: ["zoomControl"],
        });

        // Создаёт метку для каждого фильма и добавляет её в коллекцию карты
        films.forEach((film) => {
          const placemark = new ymaps.Placemark(
            [film.latitude, film.longitude],
            {
              hintContent: film.title,
              balloonContent: `${film.title} (${film.country})`,
            },
            {
              preset: "islands#circleDotIcon",
              iconColor: "#f5e768",
            },
          );

          // При клике на метку вызывает обработчик выбора фильма в родительском компоненте
          placemark.events.add("click", () => onSelect(film));
          map?.geoObjects.add(placemark);
        });

        // Следим за размером контейнера и уведомляем карту об изменении viewport
        if (containerRef.current && typeof ResizeObserver !== "undefined") { 
          resizeObserver = new ResizeObserver(() => {  
            map?.container.fitToViewport();  // Пересчитывает размеры карты при изменении размеров контейнера 
          });
          resizeObserver.observe(containerRef.current);  // Начинаем наблюдение за контейнером карты
        }

        setStatus("ready");
      } catch {
        if (!disposed) setStatus("error");
      }
    }

    void buildMap();

    // Cleanup: помечает компонент как размонтированный и уничтожает экземпляр карты
    return () => {
      disposed = true;  // Помечает компонент как размонтированный, чтобы избежать обновления состояния после cleanup
      resizeObserver?.disconnect();  // Отключает наблюдатель за изменением размеров контейнера карты
      map?.destroy();
    };
  }, [apiKey, films, onSelect, noKey]);

  return (
    <section className={styles.section} aria-labelledby="map-title">
      <h2 id="map-title">Карта фильмов</h2>

      {/* Сообщение при отсутствии ключа API в переменных окружения */}
      {noKey ? (
        <p className={styles.status}>
          Добавьте NEXT_PUBLIC_YANDEX_MAPS_API_KEY в файл .env.local.
        </p>
      ) : null}

      {/* Сообщение при ошибке загрузки скрипта или инициализации карты */}
      {status === "error" ? (
        <p className={styles.status}>Не удалось загрузить карту.</p>
      ) : null}

      {/* Сообщение о загрузке показывается только при наличии ключа */}
      {status === "loading" && !noKey ? (
        <p className={styles.status}>Карта загружается…</p>
      ) : null}

      {/* DOM-контейнер карты: Яндекс Карты монтируют canvas именно в этот элемент */}
      <div
        ref={containerRef}
        className={styles.canvas}
        aria-label="Интерактивная карта фильмов"
      />
    </section>
  );
}