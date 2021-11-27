import React, { useState } from "react";
import { signOutAuth } from "src/firebase/firebaseAuth";
import Image from "next/image";
import { auth } from "src/firebase/firebase";
import { GoThreeBars } from "react-icons/go";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const [userBar, setUserBar] = useState(false);
  const handleClickUserBar = () => {
    userBar ? setUserBar(false) : setUserBar(true);
  };

  const handleClickSignOut = () => {
    signOutAuth();
    alert("ログアウトしました");
  };

  return (
    <header className="h-16 flex justify-between px-8 bg-gray-100 relative">
      <h1 className="my-auto text-3xl">carry-manager</h1>
      <div className="my-auto">
        {router.pathname === "/" ? (
          <button className="text-xl" onClick={handleClickUserBar}>
            <GoThreeBars />
          </button>
        ) : null}

        {userBar ? (
          <div className="w-screen h-screen flex absolute top-16 left-0">
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
              className="w-[calc(100%-200px)] h-full border-[0.5px] bg-gray-500 z-10 opacity-50 "
              onClick={handleClickUserBar}
              onKeyUp={""}
            ></div>
            <div className="h-full w-[200px] ml-auto bg-white ">
              <Image
                src="/kkrn_icon_user_1.png"
                alt="user_icon"
                height="70px"
                width="70px"
              />
              <p>{auth.currentUser.uid}</p>

              <button onClick={handleClickSignOut}>ログアウト</button>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
