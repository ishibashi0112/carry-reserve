import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { FiDelete } from "react-icons/fi";
import Image from "next/image";
import { headerState } from "src/stores/valtioState";
import { useShowSideBar } from "src/hooks/useShowSideBar";
import { useHandleSideBar } from "src/hooks/useHandleSideBar";

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
    <div className="w-[416px] h-screen bg-white border-t-[0.5px] border-gray-500 border-b-[0.5px] border-l-[0.5px] ">
      <button
        onClick={headerState.clickSideBar}
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
        {currentUserCompanyData && currentUserData ? (
          <ul className="my-auto ml-3">
            <li>{currentUserData?.user_name}</li>
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
