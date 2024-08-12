import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { user } = useContext(AuthContext);
  return (
    <div className="container mx-auto p-4">
      <header className="my-8 text-center">
        <h1 className="text-4xl font-bold">Cognitive Linguistics Research</h1>
        <p className="mt-4 text-lg">
          Welcome to our research experiment platform. Your participation helps
          us understand how Indonesian grammar influences semantic
          interpretation.
        </p>
      </header>
      <div className="mt-8 space-x-4 text-center">
        <Link
          to="/experiment"
          className="rounded-full bg-emerald-500 px-6 py-3 text-white"
        >
          Get Started
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
