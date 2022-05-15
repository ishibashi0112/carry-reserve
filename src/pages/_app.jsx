import React from "react";
import "tailwindcss/tailwind.css";
import "@fullcalendar/common/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/daygrid/main.css";
import { useAuthCurrentCheck } from "src/hooks/useAuthCurrentCheck";
import { Toaster } from "react-hot-toast";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import "dayjs/locale/ja";
import dayjs from "dayjs";

dayjs.locale("ja");

const MyApp = ({ Component, pageProps }) => {
  useAuthCurrentCheck();
  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <NotificationsProvider position="bottom-left">
          <Toaster position="top-right" />
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
};

export default MyApp;
