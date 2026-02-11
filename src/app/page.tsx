import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-10 space-y-6">
      <h1 className="text-3xl font-semibold">Overnight Business Strategist</h1>
      <p className="text-gray-600">
        Set a goal at night. Wake up to a Morning Brief.
      </p>

      <Link
        href="/runs/new"
        className="inline-block bg-black text-white px-4 py-2 rounded-md"
      >
        Create a Run
      </Link>
    </main>
  );
}

