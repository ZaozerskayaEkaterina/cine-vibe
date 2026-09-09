import Link from "next/link";
import FeatureCard from "./ui/FeatureCard";

export default function HomePage() {
  return (
    <main>
      {/* Заголовок и название приложения */}
      <header>
        <p className="start">Кино-подборки</p>
        <h1>Cine-Vibe</h1>
        <p>
          Cine-Vibe помогает находить фильмы по настроению и оригинальным интересам, а не по скучным жанрам.
          Забудьте о бесконечном скроллинге — мы подберем идеальный фильм для вашего вечера.
        </p>
      </header>

      {/* Целевая аудитория */}
      <section aria-labelledby="audience-title">
        <h2 id="audience-title">Для кого этот проект</h2>
        <p>
          Для людей, которые любят кино, но устали тратить часы на поиск фильма.
          Для тех, кто хочет найти тот самый фильм под свое настроение, 
          а не просто выбирать из тысяч названий.
        </p>
      </section>

      {/* Три функции через компонент FeatureCard */}
      <section aria-labelledby="features-title">
        <h2 id="features-title">Как это работает</h2>
        <div className="feature-list">
          <FeatureCard
            title="Подборки по настроению"
            description="Фильмы для отдыха, вдохновения, уюта или острых ощущений — выбирайте свое настроение и получайте подборку."
          />
          <FeatureCard
            title="Фильм дня"
            description="Каждый день уникальная подборка из одного фильма с описанием, почему его стоит посмотреть именно сегодня."
          />
          <FeatureCard
            title="Личная коллекция"
            description="Сохраняйте понравившиеся фильмы в список Хочу посмотреть или Избранное — собирайте свою идеальную библиотеку."
          />
        </div>
      </section>

      {/* Ссылка на страницу "О проекте" */}
      <Link className="main-link" href="/about"> О проекте </Link>
    </main>
  );
}