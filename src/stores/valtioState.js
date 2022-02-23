import { proxy } from "valtio";

// イベント
export const eventsState = proxy({
  events: [],
  dateEvents: [],
  selectEvent: {},
});

//マップ
export const mapState = proxy({
  latLng: [],
  optimize: false,
  clickEventOptimize: () => {
    mapState.optimize
      ? (mapState.optimize = false)
      : (mapState.optimize = true);
  },
});

// サイドバー
export const sideBarState = proxy({
  sideBar: false,
  clickEvent: () => {
    console.log("click");
    sideBarState.sideBar
      ? (sideBarState.sideBar = false)
      : (sideBarState.sideBar = true);
  },
});
