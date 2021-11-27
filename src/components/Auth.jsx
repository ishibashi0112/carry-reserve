import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import { singUpAuth, signInAuth } from "src/firebase/firebaseAuth";
import { auth, db } from "src/firebase/firebase";
import { addDoc, collection } from "@firebase/firestore";
import StepFormBar from "src/components/StepFormBar";

const Auth = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm({
    criteriaMode: "all",
  });

  const onSubmitSignUp = async (data) => {
    console.log(data);
    singUpAuth(data.email, data.password);
    setCurrentForm("User_Data");
  };

  const onSubmitUserEntry = async (data) => {
    const companyData = await addDoc(collection(db, "companies"), {
      company_name: data.company_name,
      zipcode: data.zipcode,
      address1: data.address1,
      address2: data.address2,
      phone_number: data.phone_number,
    });

    const userData = await addDoc(collection(db, "users"), {
      user_id: auth.currentUser.uid,
      organization: data.organization,
      user_name: data.user_name,
      company_id: companyData.id,
    });
    router.push("/");
  };

  const onSubmitSignIn = async (data) => {
    console.log(data);
    signInAuth(data.email, data.password);
    router.push("/");
  };

  const [currentForm, setCurrentForm] = useState("Email_Password");
  const steps = ["Email_Password", "User_Data"];

  console.log(currentForm);

  return (
    <div className="w-1/3 mx-auto mt-[50px] bg-white">
      {router.pathname === "/auth/signUp" ? (
        <div>
          <h1 className="text-4xl text-center">SignUp</h1>
          <StepFormBar steps={steps} currentForm={currentForm} />
        </div>
      ) : (
        <h1 className="text-4xl text-center">SignIn</h1>
      )}

      {router.pathname === "/auth/signUp" ? (
        currentForm === "Email_Password" ? (
          <form className="mt-7" onSubmit={handleSubmit(onSubmitSignUp)}>
            <div className="flex flex-col gap-3">
              <label className="block">
                email
                <p className="ml-1 inline text-sm text-red-600">※</p>
                <input
                  type="text"
                  className="w-full block border border-gray-400 rounded outline-none text-lg hover:border-2 caret-blue-300  hover:border-gray-500 focus:border-2 focus:border-blue-300"
                  {...register("email", { required: true })}
                />
              </label>

              <label className="block">
                password
                <p className="ml-1 inline text-sm text-red-600">※</p>
                <input
                  type="text"
                  className="w-full block border border-gray-400 rounded outline-none text-lg hover:border-2 caret-blue-300  hover:border-gray-500 focus:border-2 focus:border-blue-300"
                  {...register("password")}
                />
              </label>
              <input
                type="submit"
                className="block w-full font-bold  bg-white border-2 rounded-md  hover:bg-blue-200 active:bg-blue-400 "
                value="submit/next"
              />
            </div>
          </form>
        ) : (
          <form className="mt-7" onSubmit={handleSubmit(onSubmitUserEntry)}>
            <div className="flex flex-col gap-3">
              <label className="block ">
                organization
                <p className="ml-1 inline text-sm text-red-600">※</p>
                <select
                  className="w-full block border-b outline-none text-lg hover:border-b-2 caret-blue-300  hover:border-gray-500 focus:border-b-2 focus:border-blue-300"
                  {...register("organization", { required: true })}
                >
                  <option value="指定無し" selected>
                    指定無し
                  </option>
                  <option value="自社">自社</option>
                  <option value="サプライヤー">サプライヤー</option>
                  <option value="ドライバー">ドライバー</option>
                </select>
              </label>

              <label className="block">
                user_name
                <p className="ml-1 inline text-sm text-red-600">※</p>
                <input
                  type="text"
                  className="w-full block border border-gray-400 rounded outline-none text-lg hover:border-2 caret-blue-300  hover:border-gray-500 focus:border-2 focus:border-blue-300"
                  {...register("user_name", { required: true })}
                />
              </label>

              <label className="block">
                company_name
                <p className="ml-1 inline text-sm text-red-600">※</p>
                <input
                  type="text"
                  className="w-full block border border-gray-400 rounded outline-none text-lg hover:border-2 caret-blue-300  hover:border-gray-500 focus:border-2 focus:border-blue-300"
                  {...register("company_name", { required: true })}
                />
              </label>

              <div className="max-h-[235px] flex flex-col gap-3 mb-4 ml-4 border-l">
                <div className="flex ">
                  <p className=" flex-grow-0 text-gray-200 pt-6">ー</p>
                  <label className=" block flex-grow ">
                    zipcode
                    <p className="ml-1  flex-1 inline text-sm text-red-600">
                      ※
                    </p>
                    <input
                      type="text"
                      className="w-full block border border-gray-400 rounded outline-none text-lg hover:border-2 caret-blue-300  hover:border-gray-500 focus:border-2 focus:border-blue-300"
                      {...register("zipcode", { required: true })}
                    />
                  </label>
                </div>
                <div className="flex ">
                  <p className="flex-grow-0 text-gray-200 pt-6">ー</p>
                  <label className="block flex-grow">
                    address1
                    <p className="ml-1 inline text-sm text-red-600">※</p>
                    <input
                      type="text"
                      className="w-full block border border-gray-400 rounded outline-none text-lg hover:border-2 caret-blue-300  hover:border-gray-500 focus:border-2 focus:border-blue-300"
                      {...register("address1", { required: true })}
                    />
                  </label>
                </div>
                <div className="flex">
                  <p className="flex-grow-0 text-gray-200 pt-6">ー</p>
                  <label className="block flex-grow">
                    address2
                    <p className="ml-1 inline text-sm text-red-600">※</p>
                    <input
                      type="text"
                      className="w-full block border border-gray-400 rounded outline-none text-lg hover:border-2 caret-blue-300  hover:border-gray-500 focus:border-2 focus:border-blue-300"
                      {...register("address2", { required: true })}
                    />
                  </label>
                </div>
                <div className="flex">
                  <p className=" text-gray-200 pt-6">ー</p>
                  <label className="block flex-grow">
                    phone_number
                    <p className="ml-1 inline text-sm text-red-600">※</p>
                    <input
                      type="text"
                      className="w-full block border border-gray-400 rounded outline-none text-lg hover:border-2 caret-blue-300  hover:border-gray-500 focus:border-2 focus:border-blue-300"
                      {...register("phone_number", { required: true })}
                    />
                  </label>
                </div>
              </div>

              <input
                type="submit"
                className="block w-full font-bold  bg-white border-2 rounded-md  hover:bg-blue-200 active:bg-blue-400 "
                value="submit"
              />
            </div>
          </form>
        )
      ) : (
        <form className="mt-8 " onSubmit={handleSubmit(onSubmitSignIn)}>
          <div className="flex flex-col gap-3">
            <label className="block">
              email
              <p className="ml-1 inline text-sm text-red-600">※</p>
              <input
                type="text"
                className="w-full block border border-gray-400 rounded outline-none text-lg hover:border-2 caret-blue-300  hover:border-gray-500 focus:border-2 focus:border-blue-300"
                {...register("email", { required: true })}
              />
            </label>
            <label className="block">
              password
              <p className="ml-1 inline text-sm text-red-600">※</p>
              <input
                type="text"
                className="w-full block border border-gray-400 rounded outline-none text-lg hover:border-2 caret-blue-300  hover:border-gray-500 focus:border-2 focus:border-blue-300"
                {...register("password")}
              />
            </label>
            <input
              type="submit"
              className="block w-full font-bold delay-100 bg-white border-2 rounded-md  hover:bg-blue-200 active:bg-blue-400 "
            />
          </div>
          <div className="flex justify-between mt-2">
            <Link href="/auth/signUp">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="block text-sm hover:text-blue-300 ">
                パスワードを忘れた場合はこちら
              </a>
            </Link>
            <Link href="/auth/signUp">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="block text-sm hover:text-blue-300 ">サインアップ</a>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default Auth;
