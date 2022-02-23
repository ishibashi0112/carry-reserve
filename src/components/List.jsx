import { deleteDoc, doc } from "@firebase/firestore";
import React, { useCallback, useState } from "react";
import EventForm from "src/components/EventFrom";
import { db } from "src/firebase/firebase";
import Map from "src/components/Map";
import { eventsState } from "src/stores/valtioState";
import { useSnapshot } from "valtio";

const List = () => {
  const eventsSnap = useSnapshot(eventsState);
  const [view, setView] = useState("確認");
  const eventId = eventsSnap.selectEvent ? eventsSnap.selectEvent.id : null;
  console.log(eventsState.dateEvents);
  const handleClickTab = useCallback((e) => {
    const buttonText = e.target.innerHTML;

    switch (buttonText) {
      case "確認":
        setView("確認");
        break;
      case "地図":
        setView("地図");
        break;
      case "追加":
        setView("追加");
        break;
    }
  }, []);

  const handleClickDelete = useCallback(async () => {
    await deleteDoc(doc(db, "events", eventId));
  }, [eventId]);

  return (
    <div className="flex-1 h-full border-[0.5px] border-gray-500 ">
      <div className="w-full h-7 bg-gray-200 flex  justify-between  text-center ">
        <button
          className={
            view === "確認"
              ? "w-1/3 bg-white  font-bold underline   "
              : "w-1/3 border-gray-500 border-b-[0.5px] border-r-[0.5px]  font-bold text-gray-400  hover:bg-gray-50 hover:opacity-80 active:opacity-40 "
          }
          onClick={handleClickTab}
        >
          確認
        </button>
        <button
          className={
            view === "地図"
              ? "w-1/3 bg-white  font-bold underline "
              : "w-1/3 border-gray-500 border-b-[0.5px] border-r-[0.5px]  border-l-[0.5px] font-bold text-gray-400  hover:bg-gray-50 hover:opacity-80 active:opacity-40"
          }
          onClick={handleClickTab}
        >
          地図
        </button>
        <button
          className={
            view === "追加"
              ? "w-1/3 bg-white  font-bold underline "
              : "w-1/3 border-gray-500 border-b-[0.5px] border-l-[0.5px] font-bold text-gray-400  hover:bg-gray-50 hover:opacity-80 active:opacity-40 "
          }
          onClick={handleClickTab}
        >
          追加
        </button>
      </div>
      {view === "確認" ? (
        <div>
          {eventsSnap.selectEvent ? (
            <div className="w-4/5 mx-auto m-3 flex flex-col gap-2">
              <div>
                <p className=" block text-xs ">行き先</p>
                <p className="w-full h-[28px] block border-b outline-none text-lg">
                  {eventsSnap.selectEvent.destination}
                </p>
              </div>

              <div>
                <p className=" block text-xs ">日時</p>
                <p className="w-full h-[28px] block border-b outline-none text-lg">
                  {eventsSnap.selectEvent.date}
                </p>
              </div>

              <div>
                <p className=" block text-xs ">時間帯</p>
                <p className="w-full h-[28px] block border-b outline-none text-lg">
                  {eventsSnap.selectEvent.time_zone}
                </p>
              </div>

              <div>
                <p className=" block text-xs ">郵便番号</p>
                <p className="w-full h-[28px] block border-b outline-none text-lg">
                  {eventsSnap.selectEvent.zipcode}
                </p>
              </div>

              <div>
                <p className=" block text-xs ">住所</p>
                <p className="w-full h-[28px] block border-b outline-none text-lg">
                  {eventsSnap.selectEvent.address1}
                  {eventsSnap.selectEvent.address2}
                </p>
              </div>

              <div>
                <p className=" block text-xs ">電話番号</p>
                <p className="w-full h-[28px] block border-b outline-none text-lg">
                  {eventsSnap.selectEvent.phone_number}
                </p>
              </div>

              <div>
                <p className=" block text-xs ">担当者</p>
                <p className="w-full h-[28px] block border-b outline-none text-lg">
                  {eventsSnap.selectEvent.key_person}
                </p>
              </div>

              <div>
                <p className=" block text-xs ">品目情報</p>
                <p className="w-full h-[28px] block border-b outline-none text-lg">
                  {eventsSnap.selectEvent.items}
                </p>
              </div>

              <div>
                <p className=" block text-xs ">備考（特記事項等）</p>
                <p className="w-full h-[28px] block border-b outline-none text-lg">
                  {eventsSnap.selectEvent.description}
                </p>
              </div>

              <button
                className="block font-bold delay-100 bg-white border-2 rounded-md"
                onClick={handleClickDelete}
              >
                削除
              </button>
            </div>
          ) : null}
        </div>
      ) : view === "地図" ? (
        <Map />
      ) : (
        <EventForm />
      )}
    </div>
  );
};

export default List;
