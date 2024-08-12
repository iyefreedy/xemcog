import { Link } from "react-router-dom";

export default function ThankYouPage() {
  return (
    <div className="container pt-10">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-3xl font-bold">Thank You!</h1>
        <p>Your submission has been received.</p>

        <Link
          to="/"
          className="mt-4 inline-block w-40 py-2 bg-green-400 rounded-lg"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
