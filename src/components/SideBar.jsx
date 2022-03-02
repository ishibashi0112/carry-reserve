import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FiDelete } from "react-icons/fi";
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
import toast from "react-hot-toast";
import { deleteSelectToast } from "src/hooks/useCustomToast";

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
            where("isDone", "==", false)
          );
          const eventsData = await getDocs(eventsQuery);
          const eventsDocs = eventsData.docs;
          const UserEventsData = eventsDocs.map((doc) => {
            const data = doc.data();
            return { ...data, id: doc.id };
          });
          setCurrentUserEventsData(UserEventsData);
        } catch (error) {
          alert(error);
        }
      }
    });
  };

  const handleClickDelete = async (e) => {
    const eventId = e.currentTarget.dataset.id;
    const eventDate = e.currentTarget.dataset.date;
    const eventDestination = e.currentTarget.dataset.destination;
    deleteSelectToast({ eventId, eventDate, eventDestination });
    // getUserEvents();
  };

  const handleClickSignOut = () => {
    sideBarState.sideBar = false;
    toast.promise(signOutAuth(), {
      loading: "Loading...",
      success: "ログアウトしました",
      error: "失敗しました",
    });
  };

  useEffect(() => {
    getUserCompanyData();
    getUserEvents();
  }, []);

  const [companySwitch, setCompanySwitch] = useState(false);
  const [eventSwitch, setEventSwitch] = useState(false);

  const handleClickSwitch = (e) => {
    const swith = e.currentTarget.dataset.switch;
    switch (swith) {
      case "events":
        eventSwitch ? setEventSwitch(false) : setEventSwitch(true);
        break;
      case "company":
        companySwitch ? setCompanySwitch(false) : setCompanySwitch(true);
        break;
    }
  };

  return (
    <div className="w-[416px] h-screen bg-white border-t-[0.5px] border-gray-500 border-b-[0.5px] border-l-[0.5px] ">
      <button
        onClick={sideBarState.clickEvent}
        className=" w-8 h-8 ml-2 text-2xl cursor-pointer rounded-full hover:bg-gray-200 hover:text-blue-500 hover:transition active:text-blue-200"
      >
        <p className="flex justify-center">
          <IoCloseOutline />
        </p>
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
        {currentUserCompanyData ? (
          <ul className="my-auto ml-3">
            <li>{currentUserCompanyData?.user_name}</li>
            <li>{currentUserCompanyData?.company_name}</li>
          </ul>
        ) : (
          <div className="my-auto ml-3">
            <p className="animate-pulse w-16 h-4 my-1 rounded-sm bg-gray-300"></p>
            <p className="animate-pulse w-24  h-4 my-1 rounded-sm bg-gray-300"></p>
          </div>
        )}
      </div>
      <hr />
      <div className="m-3 ">
        <div className="hover:text-blue-400 hover:transition active:transition-all">
          <button
            className="inline"
            onClick={handleClickSwitch}
            data-switch={"company"}
          >
            {companySwitch ? "− 所属情報" : "+ 所属情報"}
          </button>
          <p className="inline"></p>
        </div>

        <ul
          className={`overflow-hidden transition-all
            ${companySwitch ? "h-32" : "h-0"}     
          `}
        >
          <li>{currentUserCompanyData?.company_name}</li>
          <li>{`〒${currentUserCompanyData?.zipcode}`}</li>
          <li>{`${currentUserCompanyData?.address1}`}</li>
          <li>{currentUserCompanyData?.address2}</li>
          <li>{`TEL:${currentUserCompanyData?.phone_number}`}</li>
        </ul>
      </div>
      <hr />
      <div className="m-3 ">
        <div className="hover:text-blue-400 hover:transition">
          <button
            className="inline"
            onClick={handleClickSwitch}
            data-switch={"events"}
          >
            {eventSwitch ? "− 今後の予定" : "+ 今後の予定"}
          </button>
          <p className="inline"></p>
        </div>
        <ul
          className={` transition-all
            ${
              eventSwitch ? " h-48 overflow-scroll" : "h-0 overflow-hidden"
            }     
          `}
        >
          {currentUserEventsData?.map((event) => {
            return (
              <li
                key={event.id}
                className="flex justify-between rounded hover:bg-gray-100 hover:transition "
              >
                <div>
                  <p className="inline">{event.date}</p>
                  <p className="inline ml-2">{event.destination}</p>
                </div>
                <button
                  className="block mr-2 text-xl hover:text-blue-400 hover:transition "
                  data-id={event.id}
                  data-date={event.date}
                  data-destination={event.destination}
                  onClick={handleClickDelete}
                >
                  <FiDelete />
                </button>
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
