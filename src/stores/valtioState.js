import { proxy } from "valtio";

// イベント
export const eventsState = proxy({
  events: [],
  dateEvents: [],
  selectEvent: {},
});

//緯度経度
export const latLngState = proxy({ latLng: [] });

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
