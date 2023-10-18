"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";

function DirectMessage(props: any) {
  const { userId, username } = props;
  const { mutate } = useSWRConfig();

  const searchParams = useSearchParams();
  const targetId = searchParams.get("Id");

  //メッセージ取得
  const { data, error } = useSWR(
    `/api/DirectSendMessage?id=${targetId}`,
    async () => {
      const response = await fetch(`/api/DirectSendMessage?id=${targetId}`);
      const element = await response.json();
      return element;
    },
    { refreshInterval: 1000 }
  );

  useEffect(() => {
    const scroll = document.getElementById("scroll");
    if (scroll) {
      const scrollHeight = scroll?.scrollHeight;
      scroll.style.scrollBehavior = "smooth";
      scroll.scrollTop = scrollHeight;
    }
  }, [data]);

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
    e.target.reset();
    if (!response.ok) {
      console.log("ロード中にエラーが発生しました");
    }
    mutate(`/api/DirectSendMessage?id=${targetId}`);
  };

  return (
    <>
      <div className="my-5">
        <div className="text h-[60px] w-full rounded-t bg-gray-200">
          <div className="items-ceneter flex h-full justify-center">
            <div className="flex items-center font-bold">Name</div>
          </div>
        </div>
        <div
          className="mb-2 h-[700px] w-full overflow-y-auto pb-4 bg-white"
          id="scroll"
        >
          <div className="flex justify-center ">
            <ul className="w-11/12 text-left">
              {/* メッセージ */}
              {data.data
                .slice()
                .reverse()
                .map((item: any) =>
                  item.userId == userId ? (
                    <li key={item.id} className="mt-6 flex items-center">
                      <div className="mr-4 h-14 w-14 ">
                        <div className="flex h-full items-center justify-center rounded-full border">
                          img
                        </div>
                      </div>
                      <div className="rounded-xl bg-green-300 px-3 py-1 text-xl">
                        {item.content}
                      </div>
                    </li>
                  ) : (
                    <li
                      key={item.id}
                      className="mt-6 flex items-center justify-end"
                    >
                      <div className="rounded-xl bg-gray-300 px-3 py-1 text-xl">
                        {item.content}
                      </div>
                      <div className="ml-4 h-14 w-14">
                        <div className="flex h-full items-center justify-center rounded-full border">
                          img
                        </div>
                      </div>
                    </li>
                  )
                )}
            </ul>
          </div>
        </div>
        <form onSubmit={SendMessage} className="flex justify-between">
          <input
            name="message"
            type="text"
            className="h-10 w-4/5 rounded pl-3"
          />
          <button className="w-1/6 rounded border text-white">送信</button>
        </form>
      </div>
    </>
  );
}

export default DirectMessage;
