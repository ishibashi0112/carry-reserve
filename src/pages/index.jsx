import React from "react";
import Head from "next/head";
import Calendar from "src/components/calendar";
import Header from "src/components/Header";

const Home = () => {
  return (
    <div className="h-screen w-full">
      <Head>
        <title>carry-reserve</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex w-full">
        <Calendar />

        <div className="w-1/3 border-2 mt-16 ">
          <ul className="w-full h-7 flex border-b justify-between bg-gray-200 font-bold text-center">
            <li className="w-1/2 border-r-2 hover:bg-blue-200 hover:opacity-80">
              確認
            </li>
            <li className="w-1/2">追加</li>
            <li></li>
          </ul>
          <button>button</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
