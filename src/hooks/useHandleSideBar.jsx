import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { signOutAuth } from "src/firebase/firebaseAuth";
import { sideBarState } from "src/stores/valtioState";

export const useHandleSideBar = () => {
  const router = useRouter();
  const [companySwitch, setCompanySwitch] = useState(false);
  const [eventSwitch, setEventSwitch] = useState(false);

  const handleClickSwitch = useCallback(
    (e) => {
      const swith = e.currentTarget.dataset.switch;
      switch (swith) {
        case "events":
          eventSwitch ? setEventSwitch(false) : setEventSwitch(true);
          break;
        case "company":
          companySwitch ? setCompanySwitch(false) : setCompanySwitch(true);
          break;
      }
    },
    [eventSwitch, companySwitch]
  );

  const handleClickSignOut = useCallback(async () => {
    sideBarState.sideBar = false;
    await signOutAuth();
    await router.replace("/auth/signIn");
    showNotification({
      title: "SignOut",
      message: "サインアウトが完了しました!",
      autoClose: 3000,
    });
  }, []);

  return {
    companySwitch,
    eventSwitch,
    handleClickSwitch,
    handleClickSignOut,
  };
};
