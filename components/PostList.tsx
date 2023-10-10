"use client";

import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Pagination from "@mui/material/Pagination";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { PageElement } from "@/lib/pagenation";
import { Item, PostListProps } from "@/lib/types";

function PostList(props: PostListProps) {
  const { userId, username } = props;
  const [data, setData] = useState<Item[]>([]);

  //メッセージ送信
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const message = formData.get("msg");
    const Data = {
      message,
      userId,
      username,
    };

    toast.loading("投稿中..", { id: "1" });
    const response = await fetch("api/SubmitPost", {
      body: JSON.stringify(Data),
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
    });

    if (!response.ok) {
      e.arget.reset();
      toast.error("投稿に失敗しました", { id: "1" });
      console.error("HTTPエラー:", response.statusText);
    } else {
      e.target.reset();
      getList();
      toast.success("投稿しました", { id: "1" });
    }
  };

  //ページネーション
  const Pageitem = PageElement;

  const [start, setStart] = useState(0);
  const [page, setPage] = useState(1);
  const [pagecount, pageCount] = useState(1);

  const Page_data = {
    Pageitem,
    start,
  };

  const handlePage = (page: number) => {
    setPage(page);
    const start_e = (page - 1) * Pageitem;
    setStart(start_e);
  };
  //ページリスト表示(全ての投稿)
  const getList = async () => {
    const response = await fetch("api/PostList", {
      body: JSON.stringify(Page_data),
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
    });
    if (!response.ok) {
      console.error("HTTPエラー:", response.statusText);
    }
    const data = await response.json();
    setData(data.list);

    //ページ数計算
    const count = Math.ceil(data.count / Pageitem);
    pageCount(count);
    console.log(data.list);
  };

  //ページがsetされた時
  useEffect(() => {
    getList();
  }, [start]);

  //マウント時に更新
  useEffect(() => {
    getList();
  }, []);

  //Favorite

  const handleGood = async (e: any, no: number) => {
    e.preventDefault();
    const PostData = {
      no,
      userId,
    };
    const response = await fetch("api/PostGood", {
      body: JSON.stringify(PostData),
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
    });
    if (!response.ok) {
      console.error("HTTPエラー:", response.statusText);
    }
    getList();
  };
  const handleCancelGood = async (e: any, no: number) => {
    e.preventDefault();
    const PostData = {
      no,
      userId,
    };
    const response = await fetch("api/PostGood", {
      body: JSON.stringify(PostData),
      headers: {
        "Content-type": "application/json",
      },
      method: "PUT",
    });
    if (!response.ok) {
      console.error("HTTPエラー:", response.statusText);
    }
    getList();
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        {/*のちにjsでtextareaの高さ自動可変にする*/}
        <textarea
          className="mt-5 w-full rounded border border-gray-400 px-4 py-5"
          name="msg"
          placeholder="メッセージを入力して下さい"
        ></textarea>
        <div className="flex w-full justify-end">
          <input
            className="mt-2 rounded border border-gray-400 bg-white px-5 py-1"
            type="submit"
          />
        </div>
      </form>
      <div className="my-5">
        {data.map((item: any) => (
          <div
            key={item.id}
            id={item.id}
            className="my-5 rounded bg-white px-4 text-left"
          >
            <Link href={`/post?no=${item.id}`}>
              <div className="flex items-center justify-between pt-3">
                <div className="font-bold">{item.username}</div>
                <div>{new Date(item.createdAt).toLocaleString()}</div>
              </div>
              <div className="my-1">{item.content}</div>

              <div className="flex items-center pb-3">
                <div className="mr-3">
                  <ChatIcon /> {item.comment_count}
                </div>
                {/*既にGoodが押されているかのチェック */}
                {item.good.some(
                  (goodItem: any) => goodItem.userId == userId
                ) ? (
                  <button onClick={(e) => handleCancelGood(e, item.id)}>
                    <FavoriteIcon />
                    {item.good_count}
                  </button>
                ) : (
                  <button onClick={(e) => handleGood(e, item.id)}>
                    <FavoriteBorderIcon />
                    {item.good_count}
                  </button>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <div className="mb-7">
          <Pagination
            count={pagecount}
            color="primary"
            page={page}
            onChange={(e, page) => handlePage(page)}
          />
        </div>
      </div>
    </>
  );
}

export default PostList;
