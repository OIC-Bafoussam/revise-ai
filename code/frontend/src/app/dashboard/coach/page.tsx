import Navbar from "@/components/Navbar";
import "@/app/page"

export default function CoachPage() {
  return (
    <div>
      <Navbar />
      <main className="p-6">
        <h1 className="text-xl font-bold">Coach IA 🤖</h1>
        <p>Messages motivants et conseils personnalisés.</p>
      </main>
    </div>
  );
}
