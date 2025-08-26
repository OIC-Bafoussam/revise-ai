import Navbar from "@/components/Navbar";

export default function FicheDetail({ params }: { params: { id: string } }) {
  return (
    <div>
      <Navbar />
      <main className="p-6">
        <h1 className="text-xl font-bold">Fiche #{params.id}</h1>
        <p>Contenu de la fiche sélectionnée.</p>
      </main>
    </div>
  );
}
