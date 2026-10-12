import Link from "next/link";

export default function StartPage() {
  return (
    <main>
      <p className="start">Кино-подборки</p>
      <h1>Cine-Vibe</h1>
      <p className="lead">
        Cine-Vibe помогает находить фильмы по настроению и оригинальным
        интересам, а не по скучным жанрам. Забудьте о бесконечном скроллинге —
        мы подберём идеальный фильм для вашего вечера.
      </p>

      <Link className="main-link" href="/catalog">
        Открыть каталог →
      </Link>
    </main>
  );
}