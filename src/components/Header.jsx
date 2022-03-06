import React from "react";
import { GoThreeBars } from "react-icons/go";
import { CgAddR } from "react-icons/cg";
import { useRouter } from "next/router";
import SideBar from "src/components/SideBar";
import { useSnapshot } from "valtio";
import { headerState } from "src/stores/valtioState";

const Header = () => {
  const router = useRouter();
  const headerSnap = useSnapshot(headerState);

  return (
    <header className="h-14 flex justify-between px-8 bg-gray-100 relative">
      <h1 className="my-auto text-3xl">carry-manager</h1>
      <div className="my-auto">
        {router.pathname === "/" ? (
          <div className="flex">
            <button
              className="flex items-center mr-12 p-1.5 rounded-md text-sm text-white bg-gray-600 transition hover:bg-blue-400 hover:border-blue-400 hover:transition active:bg-blue-200 active:border-blue-200"
              onClick={headerState.clickAddEventForm}
            >
              <CgAddR />
              予定追加
            </button>
            <button
              className="block text-xl hover:text-blue-500 hover:transition active:text-blue-200"
              onClick={headerState.clickSideBar}
            >
              <GoThreeBars />
            </button>
          </div>
        ) : null}

        {headerSnap.sideBar ? (
          <div className="absolute top-14 right-0 z-10 ">
            <SideBar />
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
