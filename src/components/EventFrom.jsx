import { addDoc, collection } from "@firebase/firestore";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { auth, db } from "src/firebase/firebase";

const EventForm = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { isConfirm: false, user_id: auth.currentUser.uid },
    criteriaMode: "all",
  });

  const onSubmit = useCallback(async (data) => {
    console.log(data);
    const eventData = await addDoc(collection(db, "events"), {
      destination: data.destination,
      date: data.date,
      time_zone: data.time_zone,
      zipcode: data.zipcode,
      address1: data.address1,
      address2: data.address2,
      phone_number: data.phone_number,
      key_person: data.key_person,
      items: data.items,
      description: data.description,
      isConfirm: data.isConfirm,
      user_id: data.user_id,
    });
    console.log(eventData);
    reset();
  }, []);

  const handleClickSearch = () => {
    console.log("参照");
  };

  return (
    <div>
      <form
        className="w-4/5 mx-auto m-3 flex flex-col gap-2  "
        onSubmit={handleSubmit(onSubmit)}
      >
        <button
          className="block p-[0.1rem] text-xs font-bold border rounded-md border-gray-300 hover:bg-blue-200 active:bg-blue-400"
          onClick={handleClickSearch}
        >
          履歴から参照
        </button>

        <label className=" block text-xs ">
          行き先
          <p className="ml-1 inline text-sm text-red-600">※</p>
          <input
            type="text"
            className="w-full block border-b outline-none text-lg hover:border-b-2 caret-blue-300 delay-100 hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
            {...register("destination", { required: true })}
          />
        </label>

        <label className="block text-xs">
          日付
          <p className="ml-1 inline text-sm text-red-600">※</p>
          <input
            type="date"
            className="w-full block border-b outline-none text-lg hover:border-b-2 caret-blue-300 delay-100 hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
            {...register("date", { required: true })}
          />
        </label>

        <label className="block text-xs">
          時間帯
          <p className="ml-1 inline text-sm text-red-600">※</p>
          <select
            className="w-full block border-b outline-none text-lg hover:border-b-2 caret-blue-300 delay-100 hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
            {...register("time_zone", { required: true })}
          >
            <option value="指定無し" selected>
              指定無し
            </option>
            <option value="朝一">朝一</option>
            <option value="午前">午前</option>
            <option value="午後">午後</option>
          </select>
        </label>

        <label className="block text-xs">
          郵便番号(ハイフン無し)
          <p className="ml-1 inline text-sm text-red-600">※</p>
          <input
            type="text"
            className="w-full block border-b outline-none text-lg hover:border-b-2 caret-blue-300 delay-100 hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
            {...register("zipcode", {
              required: true,
              maxLength: 7,
              pattern: /[0-9]{7}/,
            })}
          />
        </label>

        <label className="block text-xs">
          住所１(番地まで)
          <p className="ml-1 inline text-sm text-red-600">※</p>
          <input
            type="text"
            className="w-full block border-b outline-none text-lg hover:border-b-2 caret-blue-300 delay-100 hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
            {...register("address1", { required: true })}
          />
        </label>

        <label className="block text-xs">
          住所２(建物名等)
          <input
            type="text"
            className="w-full block border-b outline-none text-lg hover:border-b-2 caret-blue-300 delay-100 hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
            {...register("address2")}
          />
        </label>

        <label className="block text-xs">
          電話番号(ハイフン無し)
          <p className="ml-1 inline text-sm text-red-600">※</p>
          <input
            type="text"
            className="w-full block border-b outline-none text-lg hover:border-b-2 caret-blue-300 delay-100 hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
            {...register("phone_number", {
              required: true,
              pattern: /[0-9]{9,12}/,
            })}
          />
        </label>

        <label className="block text-xs">
          担当者
          <p className="ml-1 inline text-sm text-red-600">※</p>
          <input
            type="text"
            className="w-full block border-b outline-none text-lg hover:border-b-2 caret-blue-300 delay-100 hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
            {...register("key_person", { required: true })}
          />
        </label>

        <label className="block text-xs">
          品目情報
          <p className="ml-1 inline text-sm text-red-600">※</p>
          <input
            type="text"
            className="w-full block border-b outline-none text-lg hover:border-b-2 caret-blue-300 delay-100 hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
            {...register("items", { required: true })}
          />
        </label>

        <label className="block text-xs">
          備考（特記事項等）
          <input
            type="text"
            className="w-full block border-b outline-none text-lg hover:border-b-2 caret-blue-300 delay-100 hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
            {...register("description")}
          />
        </label>

        <input type="hidden" {...register("isConfirm")} />
        <input type="hidden" {...register("user_id")} />
        <input
          type="submit"
          className="block font-bold delay-100 bg-white border-2 rounded-md  hover:bg-blue-200 active:bg-blue-400 "
        />
      </form>
    </div>
  );
};

export default EventForm;
