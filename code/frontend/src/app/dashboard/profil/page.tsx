import Navbar from "@/components/Navbar";
import"@/app/page"

export default function ProfilPage() {
  return (
    <div>
      <Navbar />
      <main className="p-6">
        <h1 className="text-xl font-bold">Mon Profil</h1>
        <p>Paramètres et informations de l’utilisateur.</p>
      </main>
    </div>
  );
}
