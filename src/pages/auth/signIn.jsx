import React from "react";
import { Header } from "src/components/Header";
import { Auth } from "src/components/Auth";

const SignIn = () => {
  return (
    <div className="h-screen w-full">
      <Header />

      <Auth />
    </div>
  );
};

export default SignIn;
