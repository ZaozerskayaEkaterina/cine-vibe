// Серверная страница маршрута /gallery.
// Она остаётся Server Component, потому что не содержит состояния.
// Вся интерактивность вынесена в клиентский PlacesGallery.

import PlacesGallery from "./_components/PlacesGallery";

export default function GalleryPage() {
  return (
    <main>
      <h1>Галерея фильмов</h1>
      <p>
        Выберите карточку или метку на карте, чтобы открыть подробное окно.
      </p>
      <PlacesGallery />
    </main>
  );
}