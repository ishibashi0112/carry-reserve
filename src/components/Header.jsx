import React, { useState } from "react";
import { GoThreeBars } from "react-icons/go";
import { CgAddR } from "react-icons/cg";
import { useRouter } from "next/router";
import SideBar from "src/components/SideBar";
import { useSnapshot } from "valtio";
import { headerState } from "src/stores/valtioState";
import { Burger, Button, Drawer, Title } from "@mantine/core";
import { AiOutlineCarryOut } from "react-icons/ai";

const Header = () => {
  const router = useRouter();
  const headerSnap = useSnapshot(headerState);
  const [opened, setOpened] = useState(false);

  return (
    <header className="h-11 flex justify-between px-8 bg-gray-100 relative">
      <Title className="my-auto" order={2}>
        <p className="flex items-center">
          <AiOutlineCarryOut />
          carry manager
        </p>
      </Title>
      <div className="my-auto">
        {router.pathname === "/" ? (
          <div className="flex items-center">
            <Button
              className="mr-12"
              variant="light"
              onClick={headerState.clickAddEventForm}
            >
              <CgAddR />
              予定追加
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

export default Header;
