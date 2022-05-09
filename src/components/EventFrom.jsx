import React, { useCallback, useState } from "react";
// import { useForm } from "react-hook-form";
import { auth } from "src/firebase/firebase";
import { sideBarState } from "src/stores/valtioState";
import { IoCloseOutline } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { useHistorySearch } from "src/hooks/useHistorySearch";
import { newEvent } from "src/firebase/firestore";
import { promiseToast } from "src/hooks/useCustomToast";
import { useForm } from "@mantine/form";
import {
  Button,
  Modal,
  ScrollArea,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { emptyValidate, zipcodeValidate } from "src/utils/validate";
import { showNotification } from "@mantine/notifications";

export const EventForm = () => {
  const { text, search, setText, handleOnChange } = useHistorySearch();
  const [isModalOpend, setIsModalOpend] = useState(false);

  const form = useForm({
    initialValues: {
      destination: "",
      date: "",
      time_zone: "",
      zipcode: "",
      address1: "",
      address2: "",
      phone_number: "",
      key_person: "",
      items: "",
      description: "",
    },
    validate: {
      destination: emptyValidate,
      date: emptyValidate,
      time_zone: emptyValidate,
      zipcode: zipcodeValidate,
      address1: emptyValidate,
      phone_number: emptyValidate,
      key_person: emptyValidate,
      items: emptyValidate,
    },
  });

  const handleClickHistory = useCallback((event) => {
    const { id, ...eventData } = event;

    form.setValues(eventData);
    setText("");
    setIsModalOpend(false);
  }, []);

  const onSubmit = useCallback(async (values) => {
    setIsLoading(true);
    const newData = {
      ...values,
      isDone: false,
      isConfirm: false,
      route_order: null,
      user_id: auth.currentUser.uid,
    };

    await newEvent(newData);
    form.reset();
    setIsLoading(false);
    showNotification({
      title: "Add new event",
      message: "新規の予定登録が完了しました!",
      autoClose: 3000,
    });
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <div className="flex justify-end p-1 h-4">
        <Button
          color="dark"
          variant="subtle"
          radius="xl"
          compact
          onClick={sideBarState.clickEventForm}
        >
          <IoCloseOutline />
        </Button>
      </div>

      <div>
        <p className="flex justify-center">
          <Button
            variant="outline"
            compact
            leftIcon={<BiSearchAlt2 />}
            onClick={() => setIsModalOpend(true)}
          >
            履歴検索
          </Button>
        </p>

        <Modal
          classNames={{
            root: "your-root-class",
            inner: "your-inner-class",
            modal: "p-0 h-96",
            header: "your-header-class",
            overlay: "your-overlay-class",
            title: "your-title-class",
            body: "your-body-class",
            close: "your-close-class",
          }}
          withCloseButton={false}
          opened={isModalOpend}
          onClose={() => setIsModalOpend(false)}
        >
          <TextInput
            variant="unstyled"
            placeholder="履歴より検索"
            icon={<BiSearchAlt2 />}
            value={text}
            onChange={handleOnChange}
          />

          <ScrollArea className="border-t p-1" style={{ height: 330 }}>
            {search
              ? search.map((event) => (
                  <div
                    className="rounded-sm transition hover:transition hover:bg-gray-200 "
                    key={event.id}
                  >
                    <div
                      className="truncate"
                      onClick={() => handleClickHistory(event)}
                      aria-hidden={true}
                    >
                      {event.destination}
                    </div>
                  </div>
                ))
              : null}
          </ScrollArea>
        </Modal>
      </div>

      <ScrollArea style={{ height: 600 }}>
        <form
          className="p-5 mt-1 flex flex-col gap-2  "
          onSubmit={form.onSubmit(onSubmit)}
        >
          <TextInput
            size="xs"
            label="行き先"
            placeholder="行き先"
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
            label=" zipcode"
            placeholder=" zipcode"
            description="※ハイフン(-)は不要です"
            {...form.getInputProps("zipcode")}
          />

          <TextInput
            size="xs"
            label=" address1"
            placeholder=" 都道府県 市町村 番地"
            description="※都道府県 市町村 番地まで"
            {...form.getInputProps("address1")}
          />

          <TextInput
            size="xs"
            label=" address2"
            placeholder="建物名 部屋番号 その他"
            description="※番地以下の住所（建物名 部屋番号）"
            {...form.getInputProps("address2")}
          />

          <TextInput
            size="xs"
            label=" phone_number"
            placeholder=" phone number"
            description="※ハイフン(-)は不要です"
            {...form.getInputProps("phone_number")}
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
            submit
          </Button>
        </form>
      </ScrollArea>
    </div>
  );
};
