"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation"; // Correct import for client-side navigation
import { useAuthService } from "@/hooks/userAuthService";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Typography from "../atoms/Typography";

interface IRegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const { register: registerUser } = useAuthService();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IRegisterForm>();

  const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
    setError(null);

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { email, password } = data;

      const response = await registerUser(email, password);

      if (response.status !== 201) {
        throw new Error("Registration failed. Please try again later.");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again later");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <Typography variant="h1" className="text-xl font-bold mb-4">
        Register
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
            className="w-full px-4 py-2 border border-gray-300 rounded"
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
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === watch("password") || "Passwords must match",
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full" variant="primary">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
