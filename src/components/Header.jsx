import React, { useCallback, useState } from "react";
import { CgAddR } from "react-icons/cg";
import { useRouter } from "next/router";
import { SideBar } from "src/components/SideBar";
import { listState, sideBarState } from "src/stores/valtioState";
import { Burger, Button, Drawer, Title } from "@mantine/core";
import { AiOutlineCarryOut } from "react-icons/ai";
import { MdOutlineDirectionsCarFilled } from "react-icons/md";
import { useSnapshot } from "valtio";

export const Header = () => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const listSnap = useSnapshot(listState);

  const handleClickProgress = () => {
    listState.isProgressOpened = listState.isProgressOpened ? false : true;
  };

  return (
    <header className="h-11 flex justify-between px-8 bg-white relative">
      <Title className="my-auto text-[4vw] xs:text-lg " order={2}>
        <p className="flex items-center">
          <AiOutlineCarryOut />
          carry manager
        </p>
      </Title>
      <div className="my-auto">
        {router.pathname === "/" ? (
          <div className="flex items-center">
            <Button
              className="hidden xs:block  mr-1 md:mr-12"
              variant="subtle"
              compact
              onClick={handleClickProgress}
            >
              <MdOutlineDirectionsCarFilled />
              <p className=" hidden sm:inline ">進捗管理</p>
            </Button>
            <Button
              className="hidden xs:block  mr-1 md:mr-12"
              variant="subtle"
              compact
              onClick={sideBarState.clickEventForm}
            >
              <CgAddR />
              <p className=" hidden sm:inline ">予定追加</p>
            </Button>

            <Burger
              size="sm"
              opened={opened}
              onClick={() => setOpened((o) => !o)}
            />
          </div>
        ) : null}

        <Drawer
          className="mt-11 "
          classNames={{
            overlay: "opacity-0",
            noOverlay: "your-noOverlay-class",
            drawer: "your-drawer-class",
            header: "your-header-class",
            title: "your-title-class",
          }}
          withCloseButton={false}
          position="right"
          padding="sm"
          size="md"
          opened={opened}
          onClose={() => setOpened(false)}
        >
          <SideBar />
        </Drawer>
      </div>
    </header>
  );
};
