import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "src/firebase/firebase";

const docsMap = (prevData) => {
  const docs = prevData.docs;
  const results = docs.map((doc) => {
    const data = doc.data();
    return { ...data, id: doc.id };
  });
  return results;
};

const whereSearch = async (collectionName, search1, search2) => {
  const ref = collection(db, collectionName);

  const q = search2?.length
    ? query(
        ref,
        where(search1[0], search1[1], search1[2]),
        where(search2[0], search2[1], search2[2])
      )
    : query(ref, where(search1[0], search1[1], search1[2]));

  const results = await getDocs(q);
  return results;
};

export const getUser = async (userId) => {
  try {
    const search1 = ["user_id", "==", userId];
    const usersData = await whereSearch("users", search1);
    const UserData = docsMap(usersData);
    return UserData;
  } catch (error) {
    alert(error);
  }
};

export const getUserCompany = async (userId) => {
  try {
    const UserData = await getUser(userId);
    const companiesRef = doc(db, "companies", UserData[0].company_id);
    const companyDoc = await getDoc(companiesRef);
    const userCompanyData = companyDoc.data();
    return userCompanyData;
  } catch (error) {
    alert(error);
  }
};

export const getUserEvents = async (userId) => {
  try {
    const search1 = ["user_id", "==", userId];
    const search2 = ["isDone", "==", false];
    const eventsData = await whereSearch("events", search1, search2);
    const UserEventsData = docsMap(eventsData);
    return UserEventsData;
  } catch (error) {
    alert(error);
  }
};

export const deleteEvent = async (eventId) => {
  console.log(eventId);
  const eventDoc = doc(db, "events", eventId);
  try {
    await deleteDoc(eventDoc);
  } catch (error) {
    alert(error);
  }
};
