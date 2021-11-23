import React from "react";
import Header from "src/components/Header";
import Auth from "src/components/Auth";
import Image from "next/image";

const SignIn = () => {
  return (
    <div className="h-screen w-full">
      {/* <div className="z-[-1] absolute top-0  ">
        <Image
          src="https://source.unsplash.com/random"
          width="1000"
          height="600"
        />
      </div> */}
      <Header />

      <Auth />
    </div>
  );
};

export default SignIn;
