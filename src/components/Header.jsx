import React, { useEffect, useState } from "react";
import { signOutAuth } from "src/firebase/firebaseAuth";
import Image from "next/image";
import { auth, db } from "src/firebase/firebase";
import { GoThreeBars } from "react-icons/go";
import { useRouter } from "next/router";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";

const Header = () => {
  const router = useRouter();
  const [SideBar, setSideBar] = useState(false);
  const handleClickSideBar = () => {
    SideBar ? setSideBar(false) : setSideBar(true);
  };

  const handleClickSignOut = () => {
    signOutAuth();
    alert("ログアウトしました");
  };

  const [currentUserCompanyData, setCurrentUserCompanyData] = useState(null);

  const getUserCompanyData = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("user_id", "==", user.uid));
        const userDataArray = await getDocs(q);
        let currentUserData;
        userDataArray.forEach((userData) => {
          console.log(userData.data());
          currentUserData = userData.data();
        });
        console.log(currentUserData);

        const companiesRef = doc(db, "companies", currentUserData.company_id);
        const companiesDoc = await getDoc(companiesRef);
        console.log(companiesDoc.data());
        const currentCompanyData = companiesDoc.data();

        setCurrentUserCompanyData({
          ...currentUserData,
          ...currentCompanyData,
        });
      }
    });
  };

  useEffect(() => {
    getUserCompanyData();
  }, []);

  return (
    <header className="h-16 flex justify-between px-8 bg-gray-100 relative">
      <h1 className="my-auto text-3xl">carry-manager</h1>
      <div className="my-auto">
        {router.pathname === "/" ? (
          <button
            className="text-xl hover:text-blue-500 hover:transition active:text-blue-200"
            onClick={handleClickSideBar}
          >
            <GoThreeBars />
          </button>
        ) : null}

        {SideBar ? (
          <div className="w-[416px] h-screen bg-white border-t-[0.5px] border-gray-500 border-b-[0.5px] border-l-[0.5px] transition-all absolute top-16 right-0">
            <button
              onClick={handleClickSideBar}
              className=" w-5 ml-2 text-2xl cursor-pointer hover:text-blue-500 hover:transition active:text-blue-200"
            >
              ×
            </button>

            <div className="w-full ml-auto flex  ">
              <div>
                <Image
                  src="/kkrn_icon_user_1.png"
                  alt="user_icon"
                  height="70px"
                  width="70px"
                />
              </div>
              <ul className="my-auto ml-3">
                <li>{currentUserCompanyData?.user_name}</li>
                <li>{currentUserCompanyData?.company_name}</li>
              </ul>
            </div>
            <hr />
            <div className="m-3 flex flex-col">
              <input
                id="company_information"
                className="absolute left-[-100vw] peer"
                type="checkbox"
              />
              <label
                htmlFor="company_information"
                className="cursor-pointer hover:text-blue-500 hover:transition active:text-blue-200"
              >
                <p className="inline  peer-checked:hidden">＋</p>
                <p className="hidden  peer-checked:block">−</p>
                <p className="inline">所属情報</p>
              </label>
              <ul className="hidden peer-checked:block">
                <li>{currentUserCompanyData?.company_name}</li>
                <li>{`〒${currentUserCompanyData?.zipcode}`}</li>
                <li>{`${currentUserCompanyData?.address1}`}</li>
                <li>{currentUserCompanyData?.address2}</li>
                <li>{`TEL:${currentUserCompanyData?.phone_number}`}</li>
              </ul>
            </div>
            <hr />
            <div className="m-3 ">
              {/* <button className="block">＋</button> */}
              <input
                id="event_index"
                className="absolute left-[-100vw] peer"
                type="checkbox"
              />
              <label
                htmlFor="event_index"
                className="cursor-pointer hover:text-blue-500 hover:transition active:text-blue-200"
              >
                ＋ 予約
              </label>

              <ul className="hidden peer-checked:block">
                <p>今後の予定</p>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <hr />
            <div className="m-3">
              <button
                className="hover:text-blue-500 hover:transition active:text-blue-200"
                onClick={handleClickSignOut}
              >
                ログアウト
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
