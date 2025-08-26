import Navbar from "@/components/Navbar";

export default function QuizDetail({ params }: { params: { id: string } }) {
  return (
    <div>
      <Navbar />
      <main className="p-6">
        <h1 className="text-xl font-bold">Quiz #{params.id}</h1>
        <p>Questions et réponses du quiz.</p>
      </main>
    </div>
  );
}
