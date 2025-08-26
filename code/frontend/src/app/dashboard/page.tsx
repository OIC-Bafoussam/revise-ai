// src/app/dashboard/page.tsx
import Navbar from "@/components/Navbar";
import "@/app/page"



export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <main className="p-6">
        <h1 className="text-2xl font-bold">Bienvenue sur revise</h1>
        <p className="mt-2">Ici tu verras tes fiches, quiz et progression.</p>
      </main>
    </div>
  );
}
