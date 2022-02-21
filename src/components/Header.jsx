import React from "react";
import { GoThreeBars } from "react-icons/go";
import { useRouter } from "next/router";
import SideBar from "src/components/SideBar";
import { useSnapshot } from "valtio";
import { sideBarState } from "src/stores/valtioState";

const Header = () => {
  const router = useRouter();
  const sideBarSnap = useSnapshot(sideBarState);

  return (
    <header className="h-16 flex justify-between px-8 bg-gray-100 relative">
      <h1 className="my-auto text-3xl">carry-manager</h1>
      <div className="my-auto">
        {router.pathname === "/" ? (
          <button
            className="text-xl hover:text-blue-500 hover:transition active:text-blue-200"
            onClick={sideBarState.clickEvent}
          >
            <GoThreeBars />
          </button>
        ) : null}

        {sideBarSnap.sideBar ? <SideBar /> : null}
      </div>
    </header>
  );
};

export default Header;
