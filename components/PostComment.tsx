"use client";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { PageElement } from "../lib/pagenation";

interface Item {
  id: number;
  comment_id: number;
  content: string;
  createdAt: Date;
  no: number;
  username: string;
}

const PostComment = (props: any) => {
  const { userId, username } = props;
  const [data, setData] = useState<Item[]>([]);

  //URLから投稿NOを取得
  const searchParams = useSearchParams();
  const post_no = searchParams.get("no");

  //コメント送信
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const message = formData.get("msg");
    const Data = {
      message,
      post_no,
      userId,
      username,
    };
    toast.loading("投稿中..", { id: "1" });
    const response = await fetch("api/SubmitPostComment", {
      body: JSON.stringify(Data),
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
    });
    e.target.reset();
    if (!response.ok) {
      toast.error("投稿に失敗しました", { id: "1" });
      console.error("HTTPエラー:", response.statusText);
    }
    getComent();
    toast.success("投稿しました", { id: "1" });
  };

  //ページネーション
  const Pageitem = PageElement;

  const [start, setStart] = useState(0);
  const [page, setPage] = useState(1);
  const [pagecount, pageCount] = useState(1);

  const Page_data = {
    Pageitem,
    post_no,
    start,
  };

  const handlePage = (page: any) => {
    setPage(page);
    const start_e = (page - 1) * Pageitem;
    setStart(start_e);
  };

  //コメントを取得
  const getComent = async () => {
    const response = await fetch("api/PostComment", {
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
    setData(data.comment);

    //ページ数計算
    const count = Math.ceil(data.count / Pageitem);
    pageCount(count);
  };
  //ページがsetされた時
  useEffect(() => {
    getComent();
  }, [start]);

  //マウント時に更新
  useEffect(() => {
    getComent();
  }, []);

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit} className="w-11/12">
          {/*のちにjsでtextareaの高さ自動可変にする*/}
          <textarea
            className="mt-4 w-full rounded border border-gray-400 px-4 py-5"
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
        <div className="my-5 w-11/12">
          {data.map((item) => (
            <div
              key={item.comment_id}
              className="my-5 rounded bg-white px-4 text-left"
            >
              <div>
                <div className="flex items-center justify-between pt-3">
                  <div className="font-bold">{item.username}</div>
                  <div>{new Date(item.createdAt).toLocaleString()}</div>
                </div>
                <div className="mt-2 pb-6">{item.content}</div>
              </div>
            </div>
          ))}
        </div>
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
};
export default PostComment;
