// module.exports = {
//   reactStrictMode: true,
// };

const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@fullcalendar/timegrid",
  "@fullcalendar/react",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/list",
]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ["source.unsplash.com"],
  },
});
