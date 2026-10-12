import Link from "next/link";
import { notFound } from "next/navigation";
import { getFilm } from "../../data/films";

// Тип параметров динамического маршрута.
// В актуальном App Router params — это Promise, который нужно await.
type FilmPageProps = {
  params: Promise<{ id: string }>;
};

export default async function FilmPage({ params }: FilmPageProps) {
  // Получение id из URL (например, "stay-2005" из /catalog/stay-2005)
  const { id } = await params; 

  // Поиск фильма по id. Если не найден — показывает 404.
  const film = getFilm(id);

  if (!film) {
    notFound();
  }

  return (
    <main>
      <h1>{film.title}</h1>
      <p className="start">{film.year} · {film.director}</p>

      <section>
        <h2>Описание</h2>
        <p>{film.summary}</p>
      </section>

      <section>
        <h2>Настроение</h2>
        <p>{film.mood}</p>
      </section>

      <Link className="main-link" href="/catalog">
        ← Назад в каталог
      </Link>
    </main>
  );
}