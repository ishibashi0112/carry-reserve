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
  reactStrictMode: true,
  env: {
    FIREBASE_API_KEY: "AIzaSyA7hHZMiIlN8maOktpbPUkDN9wAguRanyY",
    FIREBASE_AUTH_DOMAIN: "carry-reserve.firebaseapp.com",
    FIREBASE_DATABESE_URL: "https://carry-reserve.firebaseio.com",
    FIREBASE_PROJECT_ID: "carry-reserve",
    FIREBASE_STOREGE_BUCKET: "carry-reserve.appspot.com",
    FIREBASE_MESSAGING_SENDER_ID: "590633539456",
    FIREBASE_APP_ID: "1:590633539456:web:f67230dea960840287d365",
  },
});
