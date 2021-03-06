import React, { useCallback, useState } from "react";
// import { useForm } from "react-hook-form";
import { auth } from "src/firebase/firebase";
import { sideBarState } from "src/stores/valtioState";
import { IoCloseOutline } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { useHistorySearch } from "src/hooks/useHistorySearch";
import { newEvent } from "src/firebase/firestore";
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
  const [isLoading, setIsLoading] = useState(false);

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

  const handleClickHistory = useCallback(
    (event) => {
      const addEventkeys = {
        ...event,
        date: "",
        time_zone: "",
        key_person: "",
        items: "",
        description: "",
      };
      const { id, ...eventData } = addEventkeys;

      form.setValues(eventData);
      setText("");
      setIsModalOpend(false);
    },
    [form]
  );

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
      message: "??????????????????????????????????????????!",
      autoClose: 3000,
    });
  }, []);

  return (
    <div>
      <ScrollArea style={{ height: 400 }}>
        <div className="flex justify-end p-1 h-4">
          <Button
            className="hidden xs:block"
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
              ????????????
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
              placeholder="??????????????????"
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

        <form
          className="p-5 mt-1 flex flex-col gap-2  "
          onSubmit={form.onSubmit(onSubmit)}
        >
          <TextInput
            size="xs"
            label="?????????"
            placeholder="?????????"
            {...form.getInputProps("destination")}
          />

          <TextInput
            size="xs"
            label="??????"
            placeholder="??????"
            type="date"
            {...form.getInputProps("date")}
          />

          <Select
            size="xs"
            data={["????????????", "??????", "??????", "??????"]}
            label="?????????"
            placeholder="Pick one"
            {...form.getInputProps("time_zone")}
          />

          <TextInput
            size="xs"
            label=" zipcode"
            placeholder=" zipcode"
            description="???????????????(-)???????????????"
            {...form.getInputProps("zipcode")}
          />

          <TextInput
            size="xs"
            label=" address1"
            placeholder=" ???????????? ????????? ??????"
            description="??????????????? ????????? ????????????"
            {...form.getInputProps("address1")}
          />

          <TextInput
            size="xs"
            label=" address2"
            placeholder="????????? ???????????? ?????????"
            description="???????????????????????????????????? ???????????????"
            {...form.getInputProps("address2")}
          />

          <TextInput
            size="xs"
            label=" phone_number"
            placeholder=" phone number"
            description="???????????????(-)???????????????"
            {...form.getInputProps("phone_number")}
          />

          <TextInput
            size="xs"
            label=" key_person"
            placeholder=" key_person"
            description="????????????????????????"
            {...form.getInputProps("key_person")}
          />
          <TextInput
            size="xs"
            label=" items"
            placeholder=" items"
            description="????????????"
            {...form.getInputProps("items")}
          />
          <Textarea
            size="xs"
            label=" description"
            placeholder=" description"
            description=" ???????????????????????????"
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
