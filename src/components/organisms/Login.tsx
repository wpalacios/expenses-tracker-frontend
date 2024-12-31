"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation"; // Correct import for client-side navigation
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { useAuthService } from "@/hooks/userAuthService";
import Typography from "../atoms/Typography";
import { useUser } from "@/context/UserContext";

interface ILoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { setUser } = useUser();
  const { login } = useAuthService();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    setError(null);

    try {
      // Perform login (assuming `login` is a function that handles authentication)
      const { email, password } = data;

      const response = await login(email, password);
      if (response.status !== 201) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const { accessToken, ...userData } = response.data;

      setUser(userData);
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("userId", userData.id);
      router.push("/dashboard");
    } catch (err) {
      setError(
        `Login failed. Please check your credentials: ${(err as Error).message}`
      );
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <Typography variant="h1" className="text-xl font-bold mb-4">
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            label="Email"
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Input
            label="Password"
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" variant="primary" className="w-full">
          Login
        </Button>
        <p>
          Don&apos;t have an account yet?{" "}
          <a href="/register" className="text-primary hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
