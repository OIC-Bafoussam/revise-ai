import Navbar from "@/components/Navbar";
import "@/app/page"

export default function QuizPage() {
  return (
    <div>
      <Navbar />
      <main className="p-6">
        <h1 className="text-xl font-bold">Mes quiz</h1>
        <p>Liste des quiz générés.</p>
      </main>
    </div>
  );
}
