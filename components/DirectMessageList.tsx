"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function DirectMessageList(props: any) {
  const { userId, username } = props;
  const [data, setData] = useState([]);

  const getDirectMessageList = async () => {
    const response = await fetch("api/DirectMessageList");
    if (!response.ok) {
      console.error("HTTPエラー:", response.statusText);
    }
    const data = await response.json();
    setData(data.list);
  };
  useEffect(() => {
    getDirectMessageList();
  }, []);
  return (
    <>
      <div className="">
        <div className="flex flex-col items-center">
          {/* box */}
          {data.map((item: any) => (
            //自分がtargetid(最初に送った)の場合反転する必要があるため分岐
            <Link
              className="mt-5 flex w-full items-center justify-start rounded bg-white"
              href={`/DirectMessage?Id=${item.id}`}
              key={item.id}
            >
              <div className="m-3 h-16 w-16 overflow-hidden rounded-full border border-gray-300">
                <Image
                  alt="プロフィール画像"
                  src={item.avatar_img}
                  width={50}
                  height={50}
                  className="h-full w-full"
                />
              </div>
              <div className="font-bold">{item.username}</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default DirectMessageList;
