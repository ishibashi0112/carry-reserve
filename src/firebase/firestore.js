import { deleteDoc, doc } from "firebase/firestore";
import { db } from "src/firebase/firebase";

export const deleteEvent = async (eventId) => {
  console.log(eventId);
  const eventDoc = doc(db, "events", eventId);
  try {
    await deleteDoc(eventDoc);
  } catch (error) {
    alert(error);
  }
};
