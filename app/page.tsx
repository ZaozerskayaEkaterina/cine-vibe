import { redirect } from "next/navigation";

// Корневой маршрут / перенаправляет на /start.
// Так делают, когда хотят отделить "стартовую" страницу от корня.
export default function HomePage() {
  redirect("/start");
}