import { Button, Modal } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import dayjs from "dayjs";
import React, { useCallback, useState } from "react";
import { deleteEvent } from "src/firebase/firestore";

export const useDeleteModal = () => {
  const [event, setEvent] = useState({});
  const [isDeleteModalOpend, setIsDeleteModalOpend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickDeleteButton = useCallback(async () => {
    setIsLoading(true);
    await deleteEvent(event.id);
    setIsLoading(false);
    setIsDeleteModalOpend(false);
    showNotification({
      title: "Delete event",
      message: "予定の削除が完了しました!",
      autoClose: 3000,
    });
  }, [event]);

  return {
    setEvent,
    setIsDeleteModalOpend,
    deleteModal: (
      <Modal
        title={"Delete Page"}
        withCloseButton={false}
        opened={isDeleteModalOpend}
        onClose={() => setIsDeleteModalOpend(false)}
      >
        <div className="relative">
          <div className=" mb-4">
            <p>{`${dayjs(event.date).format("YY年M月D日(ddd)")} ${
              event.destination
            } を削除しますか？`}</p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            className="mr-5"
            variant="default"
            color="dark"
            onClick={() => setIsDeleteModalOpend(false)}
          >
            cancel
          </Button>
          <Button
            variant="outline"
            color="red"
            loading={isLoading}
            onClick={() => handleClickDeleteButton(event.id)}
          >
            delete
          </Button>
        </div>
      </Modal>
    ),
  };
};
