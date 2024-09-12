import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { user } = useContext(AuthContext);
  return (
    <div className="container mx-auto p-4">
      <header className="my-8 text-center">
        <h1 className="text-4xl font-bold">Eksperimen Semantik Kognitif UAI</h1>
        <p className="mt-4 text-lg">
          Hai Partisipan, selamat datang di Eksperimen Semantik Kognitif.
          Partisipasi Anda adalah kontribusi terhadap ilmu pengetahuan kognisi
          dan bahasa.
        </p>
        <p>Untuk itu, kami sangat berterima kasih.</p>
        <p> Klik "lanjut" untuk memulai eksperimen.</p>
      </header>
      <div className="mt-8 space-x-4 text-center">
        <Link
          to="/experiment"
          className="rounded-full bg-emerald-500 px-6 py-3 text-white"
        >
          Lanjut
        </Link>
        {user?.is_admin && (
          <Link
            to="/dashboard"
            className="rounded-full border-2 border-emerald-500 px-6 py-3 "
          >
            Dashboard
          </Link>
        )}
      </div>
    </div>
  );
}
