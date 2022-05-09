import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { FiDelete } from "react-icons/fi";
import { useShowSideBar } from "src/hooks/useShowSideBar";
import { useHandleSideBar } from "src/hooks/useHandleSideBar";
import { Avatar, Button, Collapse } from "@mantine/core";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import dayjs from "dayjs";
import "dayjs/locale/ja";

dayjs.locale("ja");

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
          //   className={` transition-all
          //   ${
          //     eventSwitch ? " h-48 overflow-scroll" : "h-0 overflow-hidden"
          //   }
          // `}
          >
            {currentUserEventsData?.map((event) => {
              return (
                <li
                  key={event.id}
                  className="flex justify-between rounded px-1 hover:bg-gray-100 hover:transition "
                >
                  <div className="flex">
                    <p className="w-20">
                      {dayjs(event.date).format("M/D(ddd)")}
                    </p>
                    <p className="w-28 truncate">{event.destination}</p>
                  </div>
                  {event.isConfirm ? (
                    <div className="flex">
                      <Button
                        compact
                        variant="subtle"
                        onClick={() => handleClickEdit(event)}
                      >
                        <AiOutlineEdit />
                      </Button>

                      <p className="flex items-center text-xl px-2 border border-opacity-0  text-green-500  ">
                        <AiOutlineCheck size={14} />
                      </p>
                    </div>
                  ) : (
                    <div>
                      <Button
                        compact
                        variant="subtle"
                        onClick={() => handleClickEdit(event)}
                      >
                        <AiOutlineEdit />
                      </Button>
                      <Button
                        compact
                        variant="subtle"
                        color="red"
                        onClick={() =>
                          handleClickDelete(
                            event.id,
                            event.date,
                            event.destination
                          )
                        }
                      >
                        <FiDelete />
                      </Button>
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
