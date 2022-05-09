import React from "react";
import { Auth } from "src/components/Auth";
import { Header } from "src/components/Header";

const SignUp = () => {
  return (
    <div className="h-screen w-full">
      <Header />

      <Auth />
    </div>
  );
};

export default SignUp;
