import { useEffect, useState } from "react";
import { auth, db } from "src/firebase/firebase";
import { getUser, getUserCompany, getUserEvents } from "src/firebase/firestore";
import { collection, onSnapshot } from "firebase/firestore";

export const useShowSideBar = () => {
  const [currentUserData, setCurrentUserData] = useState(null);
  const [currentUserCompanyData, setCurrentUserCompanyData] = useState(null);
  const [currentUserEventsData, setCurrentUserEventsData] = useState(null);
  const currentUserId = auth.currentUser.uid;

  const getUserData = async () => {
    const currentUserData = await getUser(currentUserId);
    setCurrentUserData({
      ...currentUserData[0],
    });
  };

  const getUserCompanyData = async () => {
    const userCompanyData = await getUserCompany(currentUserId);
    setCurrentUserCompanyData({
      ...userCompanyData,
    });
  };

  const getUserEventsData = async () => {
    try {
      const userEventsData = await getUserEvents(currentUserId);
      setCurrentUserEventsData(userEventsData);
    } catch (error) {
      alert(error);
    }
  };

  const snapShot = () => {
    const col = collection(db, "events");
    onSnapshot(col, () => {
      getUserData();
      getUserCompanyData();
      getUserEventsData();
    });
  };

  useEffect(() => {
    let abortCtrl = new AbortController();
    snapShot();
    getUserData();
    getUserCompanyData();
    getUserEventsData();
    return () => {
      abortCtrl.abort();
    };
  }, []);

  return {
    currentUserData,
    currentUserCompanyData,
    currentUserEventsData,
  };
};
