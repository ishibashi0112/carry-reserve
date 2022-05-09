import dayjs from "dayjs";
import {
  getDocs,
  collection,
  query,
  where,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "src/firebase/firebase";
import { eventsState } from "src/stores/valtioState";

export const fetcher = async (collectionName) => {
  const res = await getDocs(collection(db, collectionName));

  if (!res) {
    throw new Error("エラーが発生したため、データの取得に失敗いたしました");
  }

  const resArray = res.docs;
  const AllDoc = resArray.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return AllDoc;
};

export const progressesFetcher = async (progresses) => {
  const date = eventsState.dateEvents[0].date;
  const q = query(collection(db, progresses), where("date", "==", date));
  const res = await getDocs(q);

  if (!res) {
    throw new Error("エラーが発生したため、データの取得に失敗いたしました");
  }

  const resArray = res.docs;
  const AllProgresses = resArray.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return AllProgresses;
};
