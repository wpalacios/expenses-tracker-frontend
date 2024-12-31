"use client";

import Login from "@/components/organisms/Login";
import { UserProvider } from "@/context/UserContext";

const LoginPage = () => (
  <UserProvider>
    <Login />
  </UserProvider>
);

export default LoginPage;
