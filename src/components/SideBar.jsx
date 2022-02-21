import React, { useEffect, useState } from "react";
import { signOutAuth } from "src/firebase/firebaseAuth";
import Image from "next/image";
import { auth, db } from "src/firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";
import { sideBarState } from "src/stores/valtioState";

const SideBar = () => {
  const [currentUserCompanyData, setCurrentUserCompanyData] = useState(null);
  const [currentUserEventsData, setCurrentUserEventsData] = useState(null);

  const getUserCompanyData = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const usersRef = collection(db, "users");
        const usersQuery = query(usersRef, where("user_id", "==", user.uid));
        const userData = await getDocs(usersQuery);
        const userDocs = userData.docs;
        const currentUserData = userDocs.map((doc) => {
          const data = doc.data();
          return { ...data, id: doc.id };
        });

        const companiesRef = doc(
          db,
          "companies",
          currentUserData[0].company_id
        );
        const companyDoc = await getDoc(companiesRef);
        const currentCompanyData = companyDoc.data();
        setCurrentUserCompanyData({
          ...currentUserData[0],
          ...currentCompanyData,
        });
        console.log(currentUserCompanyData);
      }
    });
  };

  const getUserEvents = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const eventsRef = collection(db, "events");
          const eventsQuery = query(
            eventsRef,
            where("user_id", "==", auth.currentUser.uid),
            where("isConfirm", "==", false)
          );
          const eventsData = await getDocs(eventsQuery);
          const eventsDocs = eventsData.docs;
          const UserEventsData = eventsDocs.map((doc) => {
            const data = doc.data();
            return { ...data, id: doc.id };
          });
          console.log(UserEventsData);
          setCurrentUserEventsData(UserEventsData);
          console.log(currentUserEventsData);
        } catch (error) {
          alert(error);
        }
      }
    });
  };

  const handleClickSignOut = () => {
    signOutAuth();
    alert("ログアウトしました");
  };

  useEffect(() => {
    getUserCompanyData();
    getUserEvents();
  }, []);

  return (
    <div className="w-[416px] h-screen bg-white border-t-[0.5px] border-gray-500 border-b-[0.5px] border-l-[0.5px] transition absolute top-16 right-0">
      <button
        onClick={sideBarState.clickEvent}
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
          {currentUserEventsData?.map((event) => {
            return (
              <li key={event.id}>
                <p className="inline">{event.date}</p>
                <p className="inline ml-1">{event.destination}</p>
              </li>
            );
          })}
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
  );
};
export default SideBar;
