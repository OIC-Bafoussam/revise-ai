import Navbar from "@/components/Navbar";
import "@/app/page"

export default function FichesPage() {
  return (
    <div>
      <Navbar />
      <main className="p-6">
        <h1 className="text-xl font-bold">Mes fiches</h1>
        <p>Liste de tes fiches générées apparaîtra ici.</p>
      </main>
    </div>
  );
}
