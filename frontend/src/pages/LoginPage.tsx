import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Credential } from "@/types";
import * as yup from "yup";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function LoginPage() {
  const { handleLogin, user } = useContext(AuthContext);
  const loginSchema = yup.object({
    email: yup.string().email().required().default(""),
    password: yup.string().required().default(""),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credential>({
    resolver: yupResolver(loginSchema),
  });

  const attemptLogin: SubmitHandler<Credential> = async (data) => {
    await handleLogin(data);
  };

  if (user) return <Navigate to={"/"} replace />;

  return (
    <div className="container pt-20">
      <div className="flex items-center justify-center px-6">
        <div className="shadow-lg rounded-lg bg-white w-full max-w-md p-6">
          <h1 className="text-xl font-semibold mb-5">Login</h1>
          <form onSubmit={handleSubmit(attemptLogin)}>
            <div className="mb-3">
              <label htmlFor="email" className="mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                id="email"
                autoComplete="email"
                className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-shadow"
                {...register("email")}
              />
              {errors.email?.message && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
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
                {...register("password")}
              />
              {errors.password?.message && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-green-400 rounded-lg text-gray-800 font-medium border-2 border-green-400 active:border-green-700"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
