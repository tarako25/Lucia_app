"use client";
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
    setData(data.uniqueUser);
  };
  useEffect(() => {
    getDirectMessageList();
  }, []);
  return (
    <>
      <div className="">
        <div className="flex flex-col items-center">
          {/* box */}
          {data.map((item: any) =>
            //自分がtargetid(最初に送った)の場合反転する必要があるため分岐
            item.targetId == userId ? (
              <Link
                className="flex items-center w-full justify-start bg-white rounded mt-5"
                href={`/DirectMessage?Id=${item.userId}`}
                key={item.id}
              >
                <div className="p-4 m-3 rounded-full bg-gray-300">img</div>
                <div className="font-bold">{item.username}</div>
              </Link>
            ) : (
              <Link
                className="flex items-center w-full justify-start bg-white rounded mt-5"
                href={`/DirectMessage?Id=${item.targetId}`}
                key={item.id}
              >
                <div className="p-4 m-3 rounded-full bg-gray-300">img</div>
                <div className="font-bold">{item.targetname}</div>
              </Link>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default DirectMessageList;
