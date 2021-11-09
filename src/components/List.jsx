import { addDoc, collection } from "@firebase/firestore";
import React, { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "src/firebase/firebase";

const List = (props) => {
  const [view, setView] = useState("確認");
  const { register, handleSubmit } = useForm({
    defaultValues: { isConfirm: false },
  });

  const handleClick = useCallback((e) => {
    const buttonText = e.target.innerHTML;
    if (buttonText === "確認") {
      setView("確認");
      return;
    }
    setView("追加");
  }, []);

  const onSubmit = useCallback(async (data) => {
    console.log(data.destination);
    const eventData = await addDoc(collection(db, "events"), {
      date: data.date,
      destination: data.destination,
      zipcode: data.zipcode,
      aderess1: data.aderess1,
      aderess2: data.aderess2,
      phone_number: data.phone_number,
      key_person: data.key_person,
      items: data.items,
      description: data.description,
      isConfirm: data.isConfirm,
      user_id: data.user_id,
    });
    console.log(eventData);
  }, []);

  return (
    <div className="w-full h-full border-2 border-gray-500  mt-16 ">
      <div className="w-full h-7 bg-gray-300 flex border-b-2 border-gray-500  justify-between  text-center">
        <button
          className="w-1/2 border-r-2 border-gray-500 font-bold  hover:bg-gray-50 hover:opacity-60 focus:bg-blue-200"
          onClick={handleClick}
        >
          確認
        </button>
        <button
          className="w-1/2 font-bold hover:bg-gray-100  hover:opacity-60 focus:bg-blue-200"
          onClick={handleClick}
        >
          追加
        </button>
      </div>
      {view === "確認" ? (
        <div>
          {props.event ? (
            <div>
              <p>{props.event.title}</p>
              <p>{props.event.id}</p>
            </div>
          ) : (
            "予定です"
          )}
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="日付"
              className="border-b outline-none hover:border-b-2 hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
              {...register("date", { required: true })}
            />
            <input
              type="text"
              placeholder="行き先"
              className="border-b outline-none hover:border-b-2 hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
              {...register("destination", { required: true })}
            />
            <input
              type="text"
              placeholder="郵便番号(ハイフン無し)"
              className="border-b outline-none hover:border-b-2 hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
              {...register("zipcode", {
                required: true,
                maxLength: 7,
                pattern: /[0-9]{7}/,
              })}
            />
            <input
              type="text"
              placeholder="住所１(番地まで)"
              className="border-b outline-none hover:border-b-2 hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
              {...register("aderess1", { required: true })}
            />
            <input
              type="text"
              placeholder="住所２(建物名等)"
              className="border-b outline-none hover:border-b-2 hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
              {...register("aderess2", {})}
            />
            <input
              type="text"
              placeholder="電話番号(ハイフン無し)"
              className="border-b outline-none hover:border-b-2 hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
              {...register("phone_number", {
                required: true,
                pattern: /[0-9]{9,12}/,
              })}
            />
            <input
              type="text"
              placeholder="担当者"
              className="border-b outline-none hover:border-b-2 hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
              {...register("key_person", { required: true })}
            />

            <input
              type="text"
              placeholder="品目情報"
              className="border-b outline-none hover:border-b-2 hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
              {...register("items")}
            />
            <input
              type="text"
              placeholder="備考（特記事項等）"
              className="border-b outline-none hover:border-b-2 hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
              {...register("description")}
            />
            <input type="hidden" {...register("isConfirm")} />
            <input type="hidden" {...register("user_id")} />

            <input type="submit" className="block" />
          </form>
        </div>
      )}
    </div>
  );
};

export default List;
