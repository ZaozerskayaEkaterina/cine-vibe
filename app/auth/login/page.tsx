"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useDemoAuth } from "../../providers/DemoAuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useDemoAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Введите не менее 8 символов.");
      return;
    }

    login(email.trim());
    router.push("/cabinet");
  }

  return (
    <main className="form-page">
      <h1>Вход</h1>

      <p className="demo-warning">
        Учебный прототип: пароль не проверяется сервером и не сохраняется.
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            placeholder="student@example.ru"
            required
          />
          <small className="form-hint">Например: student@example.ru</small>
        </div>

        <div className="form-field">
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            minLength={8}
            placeholder="Минимум 8 символов"
            required
          />
          <small className="form-hint">Не менее 8 символов</small>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <button type="submit">Войти в демонстрационном режиме</button>
      </form>

      <p>
        Нет учебной записи? <Link href="/auth/register">Регистрация</Link>
      </p>
    </main>
  );
}