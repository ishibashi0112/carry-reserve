import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth, db } from "src/firebase/firebase";
import { addDoc, collection } from "@firebase/firestore";
import {
  Button,
  Collapse,
  LoadingOverlay,
  NativeSelect,
  PasswordInput,
  Popover,
  Select,
  Stepper,
  TextInput,
  Title,
} from "@mantine/core";
import { CheckPasswordSafety } from "src/components/CheckPasswordSafety";
import { useForm } from "@mantine/form";
import {
  emailValidate,
  emptyValidate,
  passwordCheckValidate,
  passwordValidate,
  zipcodeValidate,
} from "src/utils/validate";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "src/firebase/fetcher";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const createSelectData = (companies) => {
  const companiesData = companies.map((company) => ({
    value: company.id,
    label: company.company_name,
    group: "下記より選択してください",
  }));
  return [
    {
      value: "その他",
      label: "その他",
      group: "未登録の場合は、入力が必要です",
    },
    ...companiesData,
  ];
};

export const Auth = () => {
  const router = useRouter();
  const [stepActive, setStepActive] = useState(0);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [isCompanyFormOpened, setIsCompanyFormOpened] = useState(false);

  const { data: companies, error } = useSWRImmutable("companies", fetcher);
  const companiesSelectData = companies ? createSelectData(companies) : [];

  const signInForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: emailValidate,
      password: emptyValidate,
    },
  });

  const userForm = useForm({
    initialValues: {
      email: "",
      password: "",
      password_check: "",
      organization: "",
      user_name: "",
      company: "",
    },
    validate: {
      email: emailValidate,
      password: passwordValidate,
      password_check: passwordCheckValidate,
      organization: emptyValidate,
      user_name: emptyValidate,
      company: emptyValidate,
    },
  });

  const companyForm = useForm({
    initialValues: {
      company_name: "",
      zipcode: "",
      address1: "",
      address2: "",
      phone_number: "",
    },
    validate: {
      company_name: emptyValidate,
      zipcode: zipcodeValidate,
      address1: emptyValidate,
      phone_number: emptyValidate,
    },
  });

  const handleOnChangePasswordValue = useCallback((e) => {
    setPasswordValue(e.currentTarget.value);
  }, []);

  const handleClickNextFormStep = useCallback(() => {
    const emailError = userForm.validateField("email");
    const passwordError = userForm.validateField("password");
    const passwordCheckError = userForm.validateField("password_check");

    if (
      !emailError.hasError &&
      !passwordError.hasError &&
      !passwordCheckError.hasError
    ) {
      setStepActive(1);
    }
  }, [userForm]);

  const handleClickCheckStep = useCallback(() => {
    const userFormValidate = userForm.validate();
    const companyValue = userForm.values.company;
    //userFormのバリーデーションエラーを検知
    if (userFormValidate.hasErrors) {
      return;
    }
    //companyFormの入力有無を検知、なければ確認ステップへ
    if (companyValue !== "その他") {
      setStepActive(2);
      return;
    }
    //companyFormのバリーデーションエラーを検知、なければ確認ステップへ
    const companyFormValidate = companyForm.validate();
    if (companyFormValidate.hasErrors) {
      return;
    }
    setStepActive(2);
    return;
  }, [userForm, companyForm]);

  const handleClickBackStep = useCallback(() => {
    setStepActive((prev) => Number(prev) - 1);
  }, []);

  const handleOnChangeSelect = useCallback((value) => {
    if (value === "その他") {
      setIsCompanyFormOpened(true);
    }
    if (value !== "その他") {
      setIsCompanyFormOpened(false);
      companyForm.reset();
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const onSubmitSignIn = useCallback(
    async (value) => {
      setIsLoading(true);
      try {
        await signInWithEmailAndPassword(auth, value.email, value.password);
        router.push("/");
      } catch (error) {
        signInForm.setErrors({
          email:
            error.message === "Firebase: Error (auth/user-not-found)."
              ? "emailに誤りがあります"
              : "",
          password:
            error.message === "Firebase: Error (auth/wrong-password)."
              ? "passwordに誤りがあります"
              : "",
        });
        console.log(error.message);
        alert(error.message);
        setIsLoading(false);
      }
    },
    [router, signInForm]
  );

  const handleOnSubmitSignUp = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      const userValues = userForm.values;
      const companyValues = companyForm.values;
      const companyValue = userForm.values.company;

      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          userValues.email,
          userValues.password
        );

        const addDocUserObj = {
          user_id: user.user.uid,
          organization: userValues.organization,
          user_name: userValues.user_name,
          company_id: userValues.company,
        };

        if (companyValue !== "その他") {
          await addDoc(collection(db, "users"), addDocUserObj);
          router.push("/");
          return;
        }

        const companyData = await addDoc(
          collection(db, "companies"),
          companyValues
        );

        await addDoc(collection(db, "users"), {
          ...addDocUserObj,
          company_id: companyData.id,
        });

        router.push("/");
      } catch (error) {
        alert(error);
        setIsLoading(false);
      }
    },
    [userForm, companyForm, router]
  );

  if (router.pathname === "/auth/signIn") {
    return (
      <div className=" min-w-[300px] w-1/2 max-w-[500px] mx-auto mt-[50px] border shadow-md rounded-md  bg-white relative">
        <Title className="text-center p-4" order={2}>
          SignIn
        </Title>

        <form
          className="py-4 px-5"
          onSubmit={signInForm.onSubmit(onSubmitSignIn)}
        >
          <div className="flex flex-col gap-3">
            <TextInput
              label="Email"
              placeholder="email address"
              {...signInForm.getInputProps("email")}
            />

            <PasswordInput
              label="Password"
              placeholder="Password"
              {...signInForm.getInputProps("password")}
            />

            <Button className="mt-3" type="submit">
              送信
            </Button>
          </div>
        </form>
        <div className="flex justify-between p-2 mt-2">
          <Link href="/auth/signUp">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              <Button variant="subtle" color="gray" size="xs" compact>
                パスワードを忘れた場合はこちら
              </Button>
            </a>
          </Link>
          <Link href="/auth/signUp">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              <Button variant="subtle" size="sm" compact>
                signUp
              </Button>
            </a>
          </Link>
        </div>
        <LoadingOverlay visible={isLoading} />
      </div>
    );
  }

  //signUp時
  return (
    <div className=" min-w-[300px] w-1/2 max-w-[700px] mx-auto mt-[50px] border shadow-md rounded-md  bg-white relative">
      <Title className="text-center p-4" order={2}>
        SignUp
      </Title>
      <form onSubmit={handleOnSubmitSignUp}>
        <Stepper className="p-4" size="sm" active={stepActive} breakpoint={900}>
          <Stepper.Step
            label="Email Password"
            description="SignIn時のEmail Passwordを登録"
          >
            <div className="flex flex-col gap-3">
              <TextInput
                label="Email"
                placeholder="email address"
                {...userForm.getInputProps("email")}
              />

              <Popover
                opened={popoverOpened}
                position="bottom"
                placement="start"
                trapFocus={false}
                onFocusCapture={() => setPopoverOpened(true)}
                onBlurCapture={() => setPopoverOpened(false)}
                target={
                  <PasswordInput
                    label="Password"
                    placeholder="Password"
                    {...userForm.getInputProps("password")}
                    onChange={(value) => {
                      userForm.getInputProps("password").onChange(value);
                      handleOnChangePasswordValue(value);
                    }}
                  />
                }
              >
                <CheckPasswordSafety value={passwordValue} />
              </Popover>

              <PasswordInput
                label="Password(check)"
                placeholder="Input your password again"
                {...userForm.getInputProps("password_check")}
              />

              <Button
                className="mt-3"
                type="button"
                onClick={handleClickNextFormStep}
              >
                Next step
              </Button>
            </div>
          </Stepper.Step>
          <Stepper.Step label="User Data" description="User情報の登録">
            <div className="flex flex-col gap-3">
              <Select
                data={["自社", "サプライヤー", "ドライバー"]}
                label="organization"
                placeholder="Pick one"
                {...userForm.getInputProps("organization")}
              />
              <TextInput
                label="user_name"
                placeholder="user name"
                {...userForm.getInputProps("user_name")}
              />

              <Select
                label="company"
                data={companiesSelectData}
                description="※既に登録の会社情報を引用できます"
                placeholder="Pick company"
                searchable
                clearable
                nothingFound="No options"
                {...userForm.getInputProps("company")}
                onChange={(value) => {
                  userForm.getInputProps("company").onChange(value);
                  handleOnChangeSelect(value);
                }}
              />

              <Collapse in={isCompanyFormOpened}>
                <TextInput
                  label="company_name"
                  placeholder="company name"
                  {...companyForm.getInputProps("company_name")}
                />

                <TextInput
                  label=" zipcode"
                  placeholder=" zipcode"
                  description="※ハイフン(-)は不要です"
                  {...companyForm.getInputProps("zipcode")}
                />

                <TextInput
                  label=" address1"
                  placeholder=" 都道府県 市町村 番地"
                  description="※都道府県 市町村 番地まで"
                  {...companyForm.getInputProps("address1")}
                />

                <TextInput
                  label=" address2"
                  placeholder="建物名 部屋番号 その他"
                  description="※番地以下の住所（建物名 部屋番号）"
                  {...companyForm.getInputProps("address2")}
                />

                <TextInput
                  label=" phone_number"
                  placeholder=" phone number"
                  description="※ハイフン(-)は不要です"
                  {...companyForm.getInputProps("phone_number")}
                />
              </Collapse>

              <Button
                className="mt-3"
                type="button"
                onClick={handleClickCheckStep}
              >
                Next step
              </Button>

              <Button
                className="mt-3"
                color={"gray"}
                type="button"
                onClick={handleClickBackStep}
              >
                Back
              </Button>
            </div>
          </Stepper.Step>
          <Stepper.Step label="Check" description="入力内容の確認">
            <div className="flex flex-col gap-3">
              <TextInput
                label="Email"
                readOnly
                value={userForm.getInputProps("email").value}
              />
              <PasswordInput
                label="Password"
                readOnly
                value={userForm.getInputProps("password").value}
              />

              <Select
                data={["自社", "サプライヤー", "ドライバー"]}
                label="organization"
                readOnly
                value={userForm.getInputProps("organization").value}
              />
              <TextInput
                label="user_name"
                readOnly
                value={userForm.getInputProps("user_name").value}
              />

              <Select
                label="company"
                data={companiesSelectData}
                readOnly
                value={userForm.getInputProps("company").value}
              />
              {userForm.values.company === "その他" ? (
                <>
                  <TextInput
                    label="company_name"
                    readOnly
                    value={companyForm.getInputProps("company_name").value}
                  />

                  <TextInput
                    label=" zipcode"
                    readOnly
                    value={companyForm.getInputProps("zipcode").value}
                  />

                  <TextInput
                    label=" address1"
                    description="※都道府県 市町村 番地まで"
                    readOnly
                    value={companyForm.getInputProps("address1").value}
                  />

                  <TextInput
                    label=" address2"
                    description="※番地以下の住所（建物名 部屋番号）"
                    readOnly
                    value={companyForm.getInputProps("address2").value}
                  />

                  <TextInput
                    label=" phone_number"
                    readOnly
                    value={companyForm.getInputProps("phone_number").value}
                  />
                </>
              ) : null}

              <p className="text-sm font-bold text-red-600">
                内容がよろしければ、sunmitボタンをクリックしてください。
              </p>

              <Button className="mt-3" type="submit">
                Submit
              </Button>

              <Button
                className="mt-3"
                color={"gray"}
                type="button"
                onClick={handleClickBackStep}
              >
                Back
              </Button>
            </div>
          </Stepper.Step>
        </Stepper>
      </form>

      <LoadingOverlay visible={isLoading} />
    </div>
  );
};
