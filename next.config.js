module.exports = {
  reactStrictMode: true,
};

const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@fullcalendar/timegrid",
  "@fullcalendar/react",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
]);

module.exports = withTM({
  // any other next.js settings here
});
