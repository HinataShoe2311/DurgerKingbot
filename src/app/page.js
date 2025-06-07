"use client";
import FoodPage from "@/Components/FoodPage";
export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <FoodPage />
      </main>
    </div>
  );
}
