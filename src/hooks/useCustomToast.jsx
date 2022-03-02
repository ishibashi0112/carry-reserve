import React from "react";
import toast from "react-hot-toast";
import { deleteEvent } from "src/firebase/firestore";

// export const useCustomToast = (data) => {
const handleClickDismiss = (id) => {
  toast.dismiss(id);
};

export const deleteSelectToast = (data) => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? null : "animate-leave"
        } block w-screen h-screen `}
        aria-hidden={true}
        onClick={() => handleClickDismiss(t.id)}
      >
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } ml-auto mt-10 h-32 w-80 bg-white border rounded-md shadow-md`}
        >
          <div className="h-3/4 w-full flex flex-col items-center justify-center ">
            <div>
              <p className="inline font-bold">{data.eventDate}</p>
              &nbsp;
              <p className="inline font-bold">{data.eventDestination}</p>
              <br />
              <p>こちらを削除しますか？</p>
            </div>
          </div>
          <div className="flex justify-around h-1/4 w-full">
            <button
              className="block w-1/2 border rounded-bl-md text-sm text-blue-500 hover:bg-gray-50 hover:transition-all active:border-blue-500 active:border-2 "
              onClick={() => handleClickDismiss(t.id)}
            >
              キャンセル
            </button>
            <button
              className="block  w-1/2 border rounded-br-md text-sm text-blue-500 hover:bg-gray-50 hover:transition-all active:border-blue-500 active:border-2"
              onClick={() => {
                toast.promise(deleteEvent(data.eventId), {
                  loading: "Loading...",
                  success: "削除が完了しました",
                  error: "失敗しました",
                });
              }}
            >
              削除
            </button>
          </div>
        </div>
      </div>
    ),
    {
      duration: Infinity,
      position: "top-right",
    }
  );
};
//   return { isLoading, isSuccess, deleteSelectToast };
// };
