import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { FiDelete } from "react-icons/fi";
import Image from "next/image";
import { headerState } from "src/stores/valtioState";
import { useShowSideBar } from "src/hooks/useShowSideBar";
import { useHandleSideBar } from "src/hooks/useHandleSideBar";
import { Avatar, Button, Collapse } from "@mantine/core";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

const SideBar = () => {
  const { currentUserData, currentUserCompanyData, currentUserEventsData } =
    useShowSideBar();

  const {
    companySwitch,
    eventSwitch,
    handleClickSwitch,
    handleClickEdit,
    handleClickDelete,
    handleClickSignOut,
  } = useHandleSideBar();

  return (
    <div>
      <div className="m-2 flex">
        <div>
          <Avatar radius="xl" size="lg" />
        </div>
        {currentUserCompanyData && currentUserData ? (
          <ul className="my-auto ml-3">
            <li>{currentUserData?.user_name}</li>
            <li className="text-xs text-gray-500">
              {currentUserCompanyData?.company_name}
            </li>
          </ul>
        ) : (
          <div className="my-auto ml-3">
            <p className="animate-pulse w-16 h-4 my-1 rounded-sm bg-gray-300"></p>
            <p className="animate-pulse w-24  h-4 my-1 rounded-sm bg-gray-300"></p>
          </div>
        )}
      </div>
      <hr />
      <div className="p-3 ">
        <div>
          <Button
            variant="subtle"
            color="dark"
            compact
            onClick={handleClickSwitch}
            data-switch={"company"}
          >
            <MdOutlineKeyboardArrowUp
              className={`${
                companySwitch ? "transition -rotate-180" : null
              } transition mr-2`}
            />
            所属情報
          </Button>
        </div>
        <Collapse in={companySwitch}>
          <ul>
            <li>{currentUserCompanyData?.company_name}</li>
            <li>{`〒${currentUserCompanyData?.zipcode}`}</li>
            <li>{`${currentUserCompanyData?.address1}`}</li>
            <li>{currentUserCompanyData?.address2}</li>
            <li>{`TEL:${currentUserCompanyData?.phone_number}`}</li>
          </ul>
        </Collapse>
      </div>

      <hr />

      <div className="p-3 ">
        <div>
          <Button
            variant="subtle"
            color="dark"
            compact
            onClick={handleClickSwitch}
            data-switch={"events"}
          >
            <MdOutlineKeyboardArrowUp
              className={`${
                eventSwitch ? "transition -rotate-180" : null
              } transition mr-2`}
            />
            今後の予定
          </Button>
        </div>
        <Collapse in={eventSwitch}>
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
                  {event.isConfirm ? (
                    <div className="flex">
                      <button
                        className="mr-3 hover:text-blue-500 hover:transition active:text-blue-200"
                        onClick={() => handleClickEdit(event)}
                      >
                        <AiOutlineEdit />
                      </button>
                      <p className="mr-2 text-xl  ">
                        <AiOutlineCheck />
                      </p>
                    </div>
                  ) : (
                    <div>
                      <button
                        className="mr-3 hover:text-blue-500 hover:transition active:text-blue-200"
                        onClick={() => handleClickEdit(event)}
                      >
                        <AiOutlineEdit />
                      </button>
                      <button
                        className="mr-2 text-xl hover:text-blue-500 hover:transition active:text-blue-200"
                        onClick={() =>
                          handleClickDelete(
                            event.id,
                            event.date,
                            event.destination
                          )
                        }
                      >
                        <FiDelete />
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </Collapse>
      </div>
      <hr />
      <div className="p-3">
        <Button
          variant="subtle"
          color="red"
          compact
          onClick={handleClickSignOut}
        >
          ログアウト
        </Button>
      </div>
    </div>
  );
};
export default SideBar;
