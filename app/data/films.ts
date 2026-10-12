// Тип одного стримингового сервиса.
export type StreamingService = {
  name: string;   // Отображаемое название
  slug: string;   // Технический идентификатор для CSS
  url: string;    // Ссылка на поиск по названию фильма
  color: string;  // Брендовый цвет
};

// Тип предметной сущности "Фильм".
export type Film = {
  id: string;
  title: string;
  summary: string;
  year: number;
  director: string;
  mood: string;
  country: string;
  image: string;
  imageAlt: string;
  latitude: number;
  longitude: number;
  streaming: StreamingService[];  // Где доступен фильм
};

// Демонстрационный массив фильмов.
export const films: Film[] = [
  {
    id: "hunger-2008",
    title: "Голод",
    summary:
      "Драма о забастовке заключённых в тюрьме Белфаста и голодовке Бобби Сэндса.",
    year: 2008,
    director: "Стив Маккуин",
    mood: "Напряжение и борьба",
    country: "Великобритания",
    image: "/images/films/hunger.jpg",
    imageAlt: "постер голод",
    latitude: 52.7074,
    longitude: -0.1278,
    streaming: [
      { name: "Premier", slug: "premier", url: "https://premier.one/show/golod?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed", color: "#FFD400" },
    ],
  },
  {
    id: "platform-2019",
    title: "Платформа",
    summary:
      "Антиутопия о тюрьме, где заключённые зависят от платформы с едой, которая спускается сверху вниз.",
    year: 2019,
    director: "Гальдер Гастелу-Уррутия",
    mood: "Мрачная антиутопия",
    country: "Испания",
    image: "/images/films/platform.jpg",
    imageAlt: "постер платформа",
    latitude: 40.4168,
    longitude: -3.7038,
    streaming: [
      { name: "Netflix", slug: "netflix", url: "https://www.netflix.com/", color: "#E50914" },
    ],
  },
  {
    id: "method-2025",
    title: "Метод исключения",
    summary:
      "Детективный триллер о расследовании серии загадочных преступлений в Сеуле.",
    year: 2025,
    director: "Пак Чхан Ук",
    mood: "Загадка и расследование",
    country: "Южная Корея",
    image: "/images/films/method.jpg",
    imageAlt: "постер метод исключения",
    latitude: 35.5665,
    longitude: 126.978,
    streaming: [
      { name: "Кинопоиск", slug: "kinopoisk", url: "https://www.kinopoisk.ru/film/484791/?socialAlias=Mzc3NDc4MjA%3D", color: "#FF5500" },
      { name: "START", slug: "start", url: "https://start.ru/watch/metod-isklyucheniya?utm_source=kinopoisk&utm_medium=feed_watch&utm_campaign=metod-isklyucheniya", color: "#DC2626" },
      { name: "Wink", slug: "wink", url: "https://wink.ru/movies/metod-isklyucheniya-year-2025?utm_source=yandex&utm_medium=koldunschick&utm_content=metod-isklyucheniya-year-2025", color: "#C2410C" },
      { name: "Иви", slug: "ivi", url: "https://www.ivi.ru/watch/metod-isklyucheniya?utm_source=yandex&utm_medium=wizard", color: "#F5003D" },
      { name: "Okko", slug: "okko", url: "https://okko.tv/movie/eojjeolsugaeopda?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed&clientSessionId=1a10cf54-916d-7aaa-a953-15f106ccac49&timeStart=1791218764061&sso=false", color: "#4C1D95" },
    ],
  },
  {
    id: "holidays-2022",
    title: "Каникулы",
    summary: "Учительницы везут подростков на театральный фестиваль в Сочи.",
    year: 2022,
    director: "Анна Меликян",
    mood: "Взросление и приключения",
    country: "Россия",
    image: "/images/films/holidays.png",
    imageAlt: "постер каникулы",
    latitude: 55.7558,
    longitude: 37.6173,
    streaming: [
      { name: "Кинопоиск", slug: "kinopoisk", url: "https://www.kinopoisk.ru/film/2000124/?socialAlias=Mzc3NDc4MjA%3D", color: "#FF5500" },
      { name: "Wink", slug: "wink", url: "https://wink.ru/movies/kanikuly-year-2022?utm_source=yandex&utm_medium=koldunschick&utm_content=kanikuly-year-2022", color: "#C2410C" },
      { name: "Okko", slug: "okko", url: "https://okko.tv/movie/kanikuly-644403276?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed&clientSessionId=1a10cf49-d1f7-7aaa-4ed0-55b686a466d6&timeStart=1791218720037&sso=false", color: "#4C1D95" },
    ],
  },
  {
    id: "hyacinth-2021",
    title: "Гиацинт",
    summary:
      "Психологическая драма о семейных тайнах и поиске себя в послевоенной Польше.",
    year: 2021,
    director: "Пётр Домалевский",
    mood: "Размышления и драма",
    country: "Польша",
    image: "/images/films/hyacinth.jpg",
    imageAlt: "постер гиацинт",
    latitude: 52.2297,
    longitude: 21.0122,
    streaming: [
      { name: "Netflix", slug: "netflix", url: "https://www.netflix.com/se-en/", color: "#E50914" },
    ],
  },
  {
    id: "shutter-island-2009",
    title: "Остров проклятых",
    summary:
      "Психологический триллер о маршале, расследующем исчезновение пациентки закрытой лечебницы.",
    year: 2009,
    director: "Мартин Скорсезе",
    mood: "Загадка и напряжение",
    country: "США",
    image: "/images/films/shutter-island.jpg",
    imageAlt: "постер остров проклятых",
    latitude: 47.6062,
    longitude: -120.0321,
    streaming: [
      { name: "Кинопоиск", slug: "kinopoisk", url: "https://www.kinopoisk.ru/film/397667/?socialAlias=Mzc3NDc4MjA%3D", color: "#FF5500" },
      { name: "Wink", slug: "wink", url: "https://wink.ru/movies/ostrov-proklyatykh-year-2009?utm_source=yandex&utm_medium=koldunschick&utm_content=ostrov-proklyatykh-year-2009", color: "#C2410C" },
      { name: "Иви", slug: "ivi", url: "https://www.ivi.ru/watch/89599?utm_source=yandex&utm_medium=wizard", color: "#F5003D" },
      { name: "Okko", slug: "okko", url: "https://okko.tv/movie/shutter-island?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed", color: "#4C1D95" },
      { name: "START", slug: "start", url: "https://start.ru/watch/ostrov-proklyatyh?utm_source=kinopoisk&utm_medium=feed_watch&utm_campaign=ostrov-proklyatyh", color: "#DC2626" },
      { name: "КИОН", slug: "kion", url: "https://kion.ru/film/ostrov-proklyatyh?utm_source=yandex&utm_medium=organic&utm_campaign=wizard", color: "#7B61FF" },
      { name: "Кино1ТВ", slug: "kino1tv", url: "https://kino.1tv.ru/serials/ostrov-proklyatyh?utm_source=yandex&utm_medium=wizard", color: "#1F5FBF" },
    ],
  },
  {
    id: "wasabi-2001",
    title: "Васаби",
    summary: "Комедийный боевик о французском полицейском, который узнаёт о существовании дочери в Японии.",
    year: 2001,
    director: "Жерар Кравчик",
    mood: "Лёгкость и юмор",
    country: "Франция",
    image: "/images/films/wasabi.jpg",
    imageAlt: "постер васаби",
    latitude: 48.8566,
    longitude: 2.3522,
    streaming: [
      { name: "Кинопоиск", slug: "kinopoisk", url: "https://www.kinopoisk.ru/film/14288/?socialAlias=Mzc3NDc4MjA%3D", color: "#FF5500" },
      { name: "Иви", slug: "ivi", url: "https://www.ivi.ru/watch/132447?utm_source=yandex&utm_medium=wizard", color: "#F5003D" },
    ],
  },
  {
    id: "nice-guys-2016",
    title: "Славные парни",
    summary: "Криминальная комедия о незадачливом сыщике и его напарнике-головорезе.",
    year: 2016,
    director: "Шейн Блэк",
    mood: "Лёгкость и юмор",
    country: "США",
    image: "/images/films/nice-guys.jpg",
    imageAlt: "постер славные парни",
    latitude: 47.6062,
    longitude: -122.3321, 
    streaming: [
      { name: "Кинопоиск", slug: "kinopoisk", url: "https://www.kinopoisk.ru/film/841152/?socialAlias=Mzc3NDc4MjA%3D", color: "#FF5500" },
      { name: "Okko", slug: "okko", url: "https://okko.tv/movie/the-nice-guys?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed", color: "#4C1D95" },
      { name: "Wink", slug: "wink", url: "https://wink.ru/movies/slavnye-parni-year-2016?utm_source=yandex&utm_medium=koldunschick&utm_content=slavnye-parni-year-2016", color: "#C2410C" },
      { name: "КИОН", slug: "kion", url: "https://kion.ru/film/slavnye-parni-2016-1?utm_source=yandex&utm_medium=organic&utm_campaign=wizard", color: "#7B61FF" },
      { name: "Иви", slug: "ivi", url: "https://www.ivi.ru/watch/138661?utm_source=yandex&utm_medium=wizard", color: "#F5003D" },
    ],
  },
  {
    id: "behind-reality-2026",
    title: "Закулисье реальности",
    summary: "Фантастическая драма о границе между сном и явью.",
    year: 2026,
    director: "Кейн Парсонс",
    mood: "Загадка и размышление",
    country: "США",
    image: "/images/films/behind-reality.jpg",
    imageAlt: "постер закулисье реальности",
    latitude: 50.6062,
    longitude: -122.3321,
    streaming: [
      { name: "Кинопоиск", slug: "kinopoisk", url: "https://www.kinopoisk.ru/film/5452841/?socialAlias=Mzc3NDc4MjA%3D", color: "#FF5500" },
      { name: "Okko", slug: "okko", url: "https://okko.tv/movie/the-backrooms-649630747?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed", color: "#4C1D95" },
      { name: "КИОН", slug: "kion", url: "https://kion.ru/film/zakulise-realnosti?utm_source=yandex&utm_medium=organic&utm_campaign=wizard", color: "#7B61FF" },
      { name: "Иви", slug: "ivi", url: "https://www.ivi.ru/watch/zakulise-realnosti?utm_source=yandex&utm_medium=wizard", color: "#F5003D" },
      { name: "START", slug: "start", url: "https://start.ru/watch/zakulise-realnosti?utm_source=kinopoisk&utm_medium=feed_watch&utm_campaign=zakulise-realnosti", color: "#DC2626" },
      { name: "Wink", slug: "wink", url: "https://wink.ru/movies/zakulise-realnosti-year-2026?utm_source=yandex&utm_medium=koldunschick&utm_content=zakulise-realnosti-year-2026", color: "#C2410C" },
    ],
  },
  {
    id: "lone-wolves-2024",
    title: "Одинокие волки",
    summary: "Криминальная комедия о двух наёмниках, которых объединяют в пару.",
    year: 2024,
    director: "Джон Уоттс",
    mood: "Лёгкость и напряжение",
    country: "Великобритания",
    image: "/images/films/lone-wolves.jpg",
    imageAlt: "постер одинокие волки",
    latitude: 51.5074,
    longitude: -0.1278,
    streaming: [
      { name: "Apple TV", slug: "appletv", url: "https://tv.apple.com/", color: "#374151" },
    ],
  },
  {
    id: "memories-of-murder-2003",
    title: "Воспоминания об убийстве",
    summary: "Детектив о расследовании серии убийств в провинции Кёнгидо.",
    year: 2003,
    director: "Пон Джун Хо",
    mood: "Загадка и напряжение",
    country: "Южная Корея",
    image: "/images/films/memories-of-murder.jpg",
    imageAlt: "постер воспоминания об убийстве",
    latitude: 37.5665,
    longitude: 126.978,
    streaming: [
      { name: "Кинопоиск", slug: "kinopoisk", url: "https://www.kinopoisk.ru/film/65770/?socialAlias=Mzc3NDc4MjA%3D", color: "#FF5500" },
      { name: "Okko", slug: "okko", url: "https://okko.tv/movie/salinui-chueok?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed&clientSessionId=1a10cedd-de6c-7aaa-0be0-ac065eafeaa5&timeStart=1791218277868&sso=false", color: "#4C1D95" },
      { name: "Wink", slug: "wink", url: "https://wink.ru/movies/vospominaniya-ob-ubiystve-year-2003?utm_source=yandex&utm_medium=koldunschick&utm_content=vospominaniya-ob-ubiystve-year-2003", color: "#C2410C" },
      { name: "Иви", slug: "ivi", url: "https://www.ivi.ru/watch/131527?utm_source=yandex&utm_medium=wizard", color: "#F5003D" },
      { name: "START", slug: "start", url: "https://start.ru/watch/vospominaniya-ob-ubiystve?utm_source=kinopoisk&utm_medium=feed_watch&utm_campaign=vospominaniya-ob-ubiystve", color: "#DC2626" },
      { name: "Кино1ТВ", slug: "kino1tv", url: "https://kino.1tv.ru/serials/vospominaniya-ob-ubiystve?utm_source=yandex&utm_medium=wizard", color: "#1F5FBF" },
    ],
  },
];

// Поиск фильма по id из URL.
export function getFilm(id: string): Film | undefined {
  return films.find((film) => film.id === id);
}