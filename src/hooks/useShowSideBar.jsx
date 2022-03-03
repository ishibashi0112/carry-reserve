import { useEffect, useState } from "react";
import { auth } from "src/firebase/firebase";
import { onAuthStateChanged } from "@firebase/auth";
import { getUser, getUserCompany, getUserEvents } from "src/firebase/firestore";

export const useShowSideBar = () => {
  const [currentUserData, setCurrentUserData] = useState(null);
  const [currentUserCompanyData, setCurrentUserCompanyData] = useState(null);
  const [currentUserEventsData, setCurrentUserEventsData] = useState(null);

  const getUserData = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const currentUserId = user.uid;
        const currentUserData = await getUser(currentUserId);
        setCurrentUserData({
          ...currentUserData[0],
        });
      }
    });
  };

  const getUserCompanyData = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const currentUserId = user.uid;
        const currentCompanyData = await getUserCompany(currentUserId);
        setCurrentUserCompanyData({
          ...currentCompanyData,
        });
      }
    });
  };

  const getUserEventsData = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const currentUserId = user.uid;
          const UserEventsData = await getUserEvents(currentUserId);
          setCurrentUserEventsData(UserEventsData);
        } catch (error) {
          alert(error);
        }
      }
    });
  };

  useEffect(() => {
    let abortCtrl = new AbortController();
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
