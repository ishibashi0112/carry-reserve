import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";

const Auth = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm({
    criteriaMode: "all",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  console.log(router);

  return (
    <div className="w-1/3 mx-auto mt-[50px] bg-white">
      <h1 className="text-4xl text-center">
        {router.pathname === "/auth/signUp" ? "SignUp" : "SignIn"}
      </h1>
      {router.pathname === "/auth/signUp" ? (
        <form className="mt-8 " onSubmit={handleSubmit(onSubmit)}>
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

            <div className="max-h-[235px] flex flex-col gap-3 flex-1 mb-4 ml-4 border-l">
              <div className="flex flex-1 ">
                <p className=" text-gray-200 pt-6">ー</p>
                <label className="block">
                  zipcode
                  <p className="ml-1 inline text-sm text-red-600">※</p>
                  <input
                    type="text"
                    className=" block border border-gray-400 rounded outline-none text-lg hover:border-2 caret-blue-300  hover:border-gray-500 focus:border-2 focus:border-blue-300"
                    {...register("zipcode", { required: true })}
                  />
                </label>
              </div>
              <div className="flex ">
                <p className=" text-gray-200 pt-6">ー</p>
                <label className="block">
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
                <p className=" text-gray-200 pt-6">ー</p>
                <label className="block">
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
                <label className="block">
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
            <label className="block">
              mail_address
              <p className="ml-1 inline text-sm text-red-600">※</p>
              <input
                type="text"
                className="w-full block border border-gray-400 rounded outline-none text-lg hover:border-2 caret-blue-300  hover:border-gray-500 focus:border-2 focus:border-blue-300"
                {...register("mail_address", { required: true })}
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
            />
          </div>
        </form>
      ) : (
        <form className="mt-8 " onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <label className="block">
              mail_address
              <p className="ml-1 inline text-sm text-red-600">※</p>
              <input
                type="text"
                className="w-full block border border-gray-400 rounded outline-none text-lg hover:border-2 caret-blue-300  hover:border-gray-500 focus:border-2 focus:border-blue-300"
                {...register("mail_address", { required: true })}
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
          <Link href="/auth/signUp">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="text-sm hover:text-blue-300 ">
              パスワードを忘れた場合はこちら
            </a>
          </Link>
        </form>
      )}
    </div>
  );
};

export default Auth;
