export default function LoginPage() {
  return (
    <div className="container pt-20">
      <div className="flex items-center justify-center">
        <div className="shadow-lg rounded-lg bg-white w-full max-w-md p-6">
          <h1 className="text-xl font-semibold mb-5">Login</h1>
          <div>
            <div className="mb-3">
              <label htmlFor="email" className="mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                id="email"
                autoComplete="email"
                className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-shadow"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="mb-1.5 block">
                Password
              </label>
              <input
                type="password"
                id="password"
                autoComplete="current-password"
                className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-shadow"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-green-400 rounded-lg text-gray-800 font-medium border-2 border-green-400 active:border-green-700"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
