import React from "react";
import "tailwindcss/tailwind.css";
import "@fullcalendar/common/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/daygrid/main.css";

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
