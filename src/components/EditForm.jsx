import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateEvent } from "src/firebase/firestore";
import { promiseToast } from "src/hooks/useCustomToast";

const EditForm = (props) => {
  const { event } = props;
  const toastId = props.toastId;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      date: event.date,
      time_zone: event.time_zone,
      key_person: event.key_person,
      items: event.items,
      description: event.description,
    },
    criteriaMode: "all",
  });

  const onSubmit = useCallback(
    async (data) => {
      const updateOb = {
        date: data.date,
        time_zone: data.time_zone,
        key_person: data.key_person,
        items: data.items,
        description: data.description,
      };
      promiseToast(updateEvent(event.id, updateOb), "更新");
      toast.dismiss(toastId);
      reset();
    },
    [event]
  );

  return (
    <div>
      <h1 className="m-3 text-center font-bold  ">予定編集</h1>
      <form
        className="w-4/5 mx-auto m-3 flex flex-col gap-2  "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=" block text-xs ">
          行き先
          <p className="w-full block outline-none text-lg">
            {event.destination}
          </p>
        </div>

        <label className="block text-xs">
          ◉日付
          <input
            type="date"
            className="w-full block border-b outline-none text-lg hover:border-b-2 caret-blue-300 transition  hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
            {...register("date", { required: true })}
          />
        </label>

        <label className="block text-xs">
          ◉時間帯
          <select
            className="w-full block border-b outline-none text-lg hover:border-b-2 caret-blue-300 transition hover:transition  hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
            {...register("time_zone", { required: true })}
          >
            <option selected value="指定無し">
              指定無し
            </option>
            <option value="朝一">朝一</option>
            <option value="午前">午前</option>
            <option value="午後">午後</option>
          </select>
        </label>

        <label className="block text-xs">
          ◉担当者
          <input
            type="text"
            className="w-full block border-b outline-none text-lg hover:border-b-2 caret-blue-300 transition hover:transition  hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
            {...register("key_person", { required: true })}
          />
        </label>

        <label className="block text-xs">
          ◉品目情報
          <input
            type="text"
            className="w-full block border-b outline-none text-lg hover:border-b-2 transition caret-blue-300 hover:transition  hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
            {...register("items", { required: true })}
          />
        </label>

        <label className="block text-xs">
          ◉備考（特記事項等）
          <input
            type="text"
            className="w-full block border-b outline-none text-lg hover:border-b-2 transition caret-blue-300 hover:transition  hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
            {...register("description")}
          />
        </label>

        <input
          type="submit"
          className="block font-bold  bg-white border-2 rounded-md transition hover:transition  hover:bg-blue-200 active:bg-blue-400 "
          value={"更新"}
        />
      </form>
    </div>
  );
};

export default EditForm;
