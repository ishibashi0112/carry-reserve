import React from "react";
import "tailwindcss/tailwind.css";
import "@fullcalendar/common/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/daygrid/main.css";
import { useAuthCurrentCheck } from "src/hooks/useAuthCurrentCheck";
import { Toaster } from "react-hot-toast";

const MyApp = ({ Component, pageProps }) => {
  useAuthCurrentCheck();
  return (
    <div>
      <Toaster position="top-right" />
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
