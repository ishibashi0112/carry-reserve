import { useState } from "react";
import { signOutAuth } from "src/firebase/firebaseAuth";
import { deleteSelectToast } from "src/hooks/useCustomToast";
import { editSelectToast } from "src/hooks/useCustomToast";
import { promiseToast } from "src/hooks/useCustomToast";
import { sideBarState } from "src/stores/valtioState";

export const useHandleSideBar = () => {
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

  const handleClickEdit = (event) => {
    editSelectToast(event);
  };

  const handleClickDelete = async (id, date, destination) => {
    console.log(id, date, destination);
    deleteSelectToast({ id, date, destination });
  };

  const handleClickSignOut = () => {
    sideBarState.sideBar = false;
    promiseToast(signOutAuth(), "ログアウト");
  };

  return {
    companySwitch,
    eventSwitch,
    handleClickSwitch,
    handleClickEdit,
    handleClickDelete,
    handleClickSignOut,
  };
};
