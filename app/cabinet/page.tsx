"use client"; // Обязательная директива: клиентский компонент для работы с хуком useDemoAuth

import Link from "next/link";
import { useDemoAuth } from "../providers/DemoAuthProvider"; // Получаем контекст пользователя

export default function CabinetPage() {
  // Извлекаем текущего пользователя и функцию сброса авторизации (logout)
  const { user, logout } = useDemoAuth();

  // Если пользователь не авторизован (гость)
  if (!user) {
    return (
      <main>
        <h1>Личный кабинет</h1>
        <p className="lead">Вы не вошли в учебную запись.</p>
        <Link className="main-link" href="/auth/login">
          Войти →
        </Link>
      </main>
    );
  }

  // Если пользователь вошел — выводим его данные и кнопку выхода
  return (
    <main>
      <h1>Личный кабинет</h1>

      <dl className="profile-list">
        <dt>Имя</dt>
        <dd>{user.name}</dd>

        <dt>Email</dt>
        <dd>{user.email}</dd>
      </dl>

      {/* Кнопка выхода: вызываем функцию logout из контекста */}
      <button type="button" onClick={logout} className="logout-btn">
        Выйти из аккаунта
      </button>
    </main>
  );
}