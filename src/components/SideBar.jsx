import React, { useCallback, useState } from "react";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { FiDelete } from "react-icons/fi";
import { useShowSideBar } from "src/hooks/useShowSideBar";
import { useHandleSideBar } from "src/hooks/useHandleSideBar";
import {
  ActionIcon,
  Avatar,
  Button,
  Collapse,
  Indicator,
  Popover,
  ScrollArea,
} from "@mantine/core";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import dayjs from "dayjs";
import { useEditModal } from "src/hooks/useEditModal";
import { useDeleteModal } from "src/hooks/useDeleteModal";

export const SideBar = () => {
  const { currentUserData, currentUserCompanyData, currentUserEventsData } =
    useShowSideBar();

  const {
    companySwitch,
    eventSwitch,
    handleClickSwitch,
    // handleClickEdit,
    // handleClickDelete,
    handleClickSignOut,
  } = useHandleSideBar();

  const {
    setEvent: setEditEvent,
    setIsEditModalOpend,
    editModal,
  } = useEditModal();

  const {
    setEvent: setDeleteEvent,
    setIsDeleteModalOpend,
    deleteModal,
  } = useDeleteModal();

  const handleClickEdit = useCallback((event) => {
    setEditEvent(event);
    setIsEditModalOpend(true);
  }, []);

  const handleClickDelete = useCallback((event) => {
    setDeleteEvent(event);
    setIsDeleteModalOpend(true);
  }, []);
  const [opened, setOpened] = useState(false);
  return (
    <div>
      <div className="m-2 flex">
        <div>
          <Popover
            opened={opened}
            onClose={() => setOpened(false)}
            position="bottom"
            placement="start"
            trapFocus={false}
            closeOnEscape={false}
            width={260}
            styles={{ body: { pointerEvents: "none" } }}
            transition="slide-up"
            target={
              <ActionIcon
                className="m-1"
                size="xl"
                onClick={() => setOpened((o) => !o)}
              >
                <Indicator
                  classNames={{ indicator: "p-0" }}
                  label={<AiOutlinePlus className="p-0" size={11} />}
                  color="green"
                  offset={7}
                  position="bottom-end"
                  withBorder
                  size={16}
                >
                  <Avatar radius={9999} size="lg" src={"IMG-8743.JPG"} />
                </Indicator>
              </ActionIcon>
            }
            shadow="md"
          >
            <Avatar
              className="m-3"
              radius="xl"
              size="xl"
              src={"IMG-8743.JPG"}
            />
          </Popover>
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
      <div className="p-2 ">
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

      <div className="p-2 ">
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
          <ScrollArea
            style={{ height: 300 }}
            offsetScrollbars
            scrollbarSize={8}
          >
            <ul>
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
                          onClick={() => handleClickDelete(event)}
                        >
                          <FiDelete />
                        </Button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </ScrollArea>
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

      {editModal}
      {deleteModal}
    </div>
  );
};
