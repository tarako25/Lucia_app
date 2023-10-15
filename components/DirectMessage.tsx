"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

function DirectMessage(props: any) {
  const { userId, username } = props;

  const searchParams = useSearchParams();
  const targetId = searchParams.get("Id");

  const [message, setMessage] = useState([]);

  //メッセージ取得
  const { data, error } = useSWR(
    `/api/DirectSendMessage?id=${targetId}`,
    async () => {
      const response = await fetch(`/api/DirectSendMessage?id=${targetId}`);
      const element = await response.json();
      console.log(element.data);
      return element;
    }
  );

  if (error) {
    return <div>ユーザーの取得に失敗しました：{error.message}</div>;
  }

  if (!data) {
    return <div>ユーザーの読み込み中...</div>;
  }
  const SendMessage = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch(`/api/DirectSendMessage?id=${targetId}`, {
      body: formData,
      method: "POST",
    });
    if (!response.ok) {
      console.log("ロード中にエラーが発生しました");
    }
  };

  return (
    <>
      <div className="my-5">
        <div className="bg-gray-200 w-full h-[60px] rounded-t text">
          <div className="flex justify-center items-ceneter h-full">
            <div className="flex items-center font-bold">Name</div>
          </div>
        </div>
        <div className="bg-white h-[700px] w-full mb-2 overflow-y-auto">
          <div className="flex justify-center ">
            <ul className="w-11/12 text-left">
              {/* メッセージ */}
              <li className="flex items-center mt-6">
                <div className="mr-4 w-14 h-14 ">
                  <div className="justify-center items-center flex h-full border rounded-full">
                    img
                  </div>
                </div>
                <div className="text-xl bg-gray-300 px-3 py-1 rounded-xl">
                  sample
                </div>
              </li>
            </ul>
          </div>
        </div>
        <form onSubmit={SendMessage} className="flex justify-between">
          <input
            name="message"
            type="text"
            className="w-4/5 rounded h-10 pl-3"
          />
          <button className="border text-white w-1/6 rounded">送信</button>
        </form>
      </div>
    </>
  );
}

export default DirectMessage;
