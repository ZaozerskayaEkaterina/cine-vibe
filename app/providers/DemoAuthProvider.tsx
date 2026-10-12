"use client"; // Обязательная директива: клиентский компонент для работы с хуками useState и useContext

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

// Тип данных авторизованного пользователя
export type DemoUser = {
  name: string;
  email: string;
};

// Интерфейс контекста авторизации
type DemoAuthContextValue = {
  user: DemoUser | null;                           // Текущий пользователь или null (если гость)
  login: (email: string) => void;                  // Функция для имитации входа
  register: (name: string, email: string) => void; // Функция для имитации регистрации
  logout: () => void;                              // Функция для выхода из аккаунта
};

// Создание React Context с начальным значением null
const DemoAuthContext = createContext<DemoAuthContextValue | null>(null);

/**
 * Провайдер состояния авторизации.
 * Оборачивает приложение в layout.tsx для доступа к состоянию пользователя из любой страницы.
 */
export default function DemoAuthProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  // Локальное состояние React для хранения текущего пользователя
  const [user, setUser] = useState<DemoUser | null>(null);

  // useMemo — чтобы объект контекста не пересоздавался на каждом рендере.
  // Пересоздаётся только при изменении user.
  const value = useMemo<DemoAuthContextValue>(
    () => ({
      user,
      // Имитация входа: берется имя из левой части email, если оно не было задано
      login(email: string) {
        const name = email.split("@")[0]?.trim() || "Гость";
        setUser({ name, email });
      },
      // Имитация регистрации: сохраняется имя и email
      register(name: string, email: string) {
        setUser({ name: name.trim(), email });
      },
      // Имитация выхода: сбрасываеется состояние пользователя в null
      logout() {
        setUser(null);
      },
    }),
    [user]
  );

  return (
    <DemoAuthContext.Provider value={value}>
      {children}
    </DemoAuthContext.Provider>
  );
}

/**
 * Пользовательский хук useDemoAuth()
 * Позволяет клиентским компонентам получать доступ к состоянию пользователя и функциям управления.
 */
export function useDemoAuth(): DemoAuthContextValue {
  const context = useContext(DemoAuthContext);
  if (!context) {
    throw new Error(
      "useDemoAuth должен использоваться строго внутри компонента <DemoAuthProvider>"
    );
  }
  return context;
}