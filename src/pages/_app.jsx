import React from "react";
import "tailwindcss/tailwind.css";
import "@fullcalendar/common/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/daygrid/main.css";
import { useAuthCurrentCheck } from "src/hooks/useAuthCurrentCheck";

const MyApp = ({ Component, pageProps }) => {
  useAuthCurrentCheck();
  return <Component {...pageProps} />;
};

export default MyApp;
