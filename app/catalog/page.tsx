import Link from "next/link";
import { films } from "../data/films";  // Импорт массива из соседней папки

export default function CatalogPage() {
  return (
    <main>
      <h1>Каталог фильмов</h1>
      <p className="start">Выберите фильм, чтобы узнать подробнее</p>

      {/* Сетка карточек */}
      <div className="feature-list">
        {films.map((film) => (
          // key нужен React для отслеживания элементов списка
          <article className="feature-card" key={film.id}>
            <h2>{film.title}</h2>
            <p>{film.summary}</p>
            <p className="film-meta">
              {film.year} · {film.director}
            </p>
            <p className="film-mood">Настроение: {film.mood}</p>

            {/* Ссылка на динамическую страницу: /catalog/stay-2005 и т.д. */}
            <Link className="main-link" href={`/catalog/${film.id}`}>
              Подробнее →
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}