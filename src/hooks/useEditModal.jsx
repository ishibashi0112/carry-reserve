import { Button, Modal, Select, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import React, { useCallback, useEffect, useState } from "react";
import { updateEvent } from "src/firebase/firestore";
import { emptyValidate } from "src/utils/validate";

export const useEditModal = () => {
  const [event, setEvent] = useState({});
  const [isEditModalOpend, setIsEditModalOpend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      destination: "",
      date: "",
      time_zone: "",
      key_person: "",
      items: "",
      description: "",
    },
    validate: {
      destination: emptyValidate,
      date: emptyValidate,
      time_zone: emptyValidate,
      key_person: emptyValidate,
      items: emptyValidate,
    },
  });

  const onSubmit = useCallback(
    async (values) => {
      setIsLoading(true);
      await updateEvent(event.id, values);
      setIsLoading(false);
      setIsEditModalOpend(false);
      showNotification({
        title: "Updated event",
        message: "予定の更新が完了しました!",
        autoClose: 3000,
      });
    },
    [event]
  );

  useEffect(() => {
    if (Object.keys(event).length) {
      form.setValues({
        destination: event.destination,
        date: event.date,
        time_zone: event.time_zone,
        key_person: event.key_person,
        items: event.items,
        description: event.description,
      });
    }
  }, [event]);

  return {
    setEvent,
    setIsEditModalOpend,
    editModal: (
      <Modal
        title={"Edit Page"}
        withCloseButton={false}
        opened={isEditModalOpend}
        onClose={() => setIsEditModalOpend(false)}
      >
        <form
          className="w-4/5 mx-auto m-3 flex flex-col gap-2  "
          onSubmit={form.onSubmit(onSubmit)}
        >
          <TextInput
            size="xs"
            label="行き先"
            placeholder="行き先"
            variant="unstyled"
            readOnly
            {...form.getInputProps("destination")}
          />

          <TextInput
            size="xs"
            label="日付"
            placeholder="日付"
            type="date"
            {...form.getInputProps("date")}
          />

          <Select
            size="xs"
            data={["指定無し", "朝一", "午前", "午後"]}
            label="時間帯"
            placeholder="Pick one"
            {...form.getInputProps("time_zone")}
          />

          <TextInput
            size="xs"
            label=" key_person"
            placeholder=" key_person"
            description="※受取先の担当者"
            {...form.getInputProps("key_person")}
          />
          <TextInput
            size="xs"
            label=" items"
            placeholder=" items"
            description="品目情報"
            {...form.getInputProps("items")}
          />
          <Textarea
            size="xs"
            label=" description"
            placeholder=" description"
            description=" 備考（特記事項等）"
            {...form.getInputProps("description")}
          />
          <Button className="mt-2" type="submit" loading={isLoading}>
            update
          </Button>
        </form>
      </Modal>
    ),
  };
};
