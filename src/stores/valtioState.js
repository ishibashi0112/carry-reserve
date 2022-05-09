import { proxy } from "valtio";

// イベント
export const eventsState = proxy({
  events: [],
  dateEvents: [],
  selectEvent: {},
  deleteEventId: [],
  editEvents: [],
});

//マップ
export const mapState = proxy({
  show: false,
  latLng: [],
  optimize: false,
  clickEventOptimize: () => {
    mapState.optimize
      ? (mapState.optimize = false)
      : (mapState.optimize = true);
  },
  distanceAndTimes: [],
});

// サイドバー
export const sideBarState = proxy({
  isEventFormOpened: false,
  clickEventForm: () => {
    sideBarState.isEventFormOpened
      ? (sideBarState.isEventFormOpened = false)
      : (sideBarState.isEventFormOpened = true);
  },
});

// ルートリスト
export const listState = proxy({
  editMode: false,
  isProgressOpened: false,
});
