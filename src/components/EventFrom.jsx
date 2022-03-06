import { addDoc, collection } from "@firebase/firestore";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { auth, db } from "src/firebase/firebase";
import { headerState } from "src/stores/valtioState";
import { IoCloseOutline } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { useHistorySearch } from "src/hooks/useHistorySearch";
import { newEvent } from "src/firebase/firestore";
import { promiseToast } from "src/hooks/useCustomToast";

const EventForm = () => {
  const { text, search, setText, handleOnChange } = useHistorySearch();

  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      isDone: false,
      isConfirm: false,
      route_order: null,
      user_id: auth.currentUser.uid,
    },
    criteriaMode: "all",
  });

  const handleClickHistory = (event) => {
    for (const key in event) {
      setValue(key, event[key]);
    }
    setText("");
  };

  const onSubmit = useCallback(async (data) => {
    promiseToast(newEvent(data), "新規作成");
    reset();
  }, []);

  return (
    <div className="">
      <button
        className="block ml-auto  text-2xl rounded-full hover:bg-gray-200 hover:text-blue-500 hover:transition active:text-blue-200"
        onClick={headerState.clickAddEventForm}
      >
        <IoCloseOutline />
      </button>

      <div className="flex justify-center">
        <div className="relative flex w-3/5  items-center border rounded-md shadow">
          <BiSearchAlt2 />
          <input
            type="text"
            className="w-full outline-none"
            placeholder="履歴より検索"
            value={text}
            onChange={handleOnChange}
          />
          {search?.length ? (
            <ul className="absolute top-7 h-52 w-52 border rounded-md bg-white shadow  overscroll-y-auto ">
              {search.map((event) => (
                <li
                  className="border-b hover:bg-blue-100 active:opacity-70"
                  key={event.id}
                >
                  <div
                    className="truncate"
                    onClick={() => handleClickHistory(event)}
                    aria-hidden={true}
                  >
                    {event.destination}
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <form
        className="w-4/5 mx-auto m-3 flex flex-col gap-2  "
        onSubmit={handleSubmit(onSubmit)}
      >
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
        <input type="hidden" {...register("isDone")} />
        <input type="hidden" {...register("route_order")} />
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
