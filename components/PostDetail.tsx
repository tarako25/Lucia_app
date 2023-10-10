"use client";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PostDetail = (props: any) => {
  const { userId } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const post_no = searchParams.get("no");

  interface Data {
    id: number;
    comment_count: number;
    content: string;
    createdAt: Date;
    good: Array<{
      userId: string | undefined;
    }>;
    good_count: number;
    user: {
      id: string;
      username: string;
    };
    userId: string;
  }
  const [data, setData] = useState<Data | null>(null);

  //投稿の削除
  const handleDelete = async () => {
    const log = confirm("投稿を削除しますか?");
    if (!log) {
      return;
    }
    const response = await fetch(`api/PostDelete?id=${post_no}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.error("HTTPエラー:", response.statusText);
    } else {
      router.back();
    }
  };

  const fetchLoard = async () => {
    //投稿詳細コンポーネント
    const response = await fetch("api/PostDetail", {
      body: JSON.stringify(post_no),
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
    });
    if (!response.ok) {
      console.error("HTTPエラー:", response.statusText);
    }
    const element = await response.json();
    setData(element.post);
  };

  useEffect(() => {
    fetchLoard();
  }, []);

  //Favorite

  const handleGood = async (e: any, no: any) => {
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
    fetchLoard();
  };
  const handleCancelGood = async (e: any, no: any) => {
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
    fetchLoard();
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-11/12 rounded bg-white px-4 text-left">
          <div className="flex items-center justify-between pt-3">
            <Link href={data ? data.user.id : ""} className="">
              <div className="font-bold">
                {data ? data.user.username : null}
              </div>
            </Link>
            <div>{data ? new Date(data.createdAt).toLocaleString() : null}</div>
          </div>
          <div className="my-5">{data ? data.content : null}</div>
          <div className="flex items-center pb-3">
            <div className="mr-3">
              <ChatIcon /> {data?.comment_count}
            </div>
            {/*既にGoodが押されているかのチェック */}
            {data?.good.some((goodItem: any) => goodItem.userId == userId) ? (
              <button onClick={(e) => handleCancelGood(e, post_no)}>
                <FavoriteIcon />
                {data?.good_count}
              </button>
            ) : (
              <button onClick={(e) => handleGood(e, post_no)}>
                <FavoriteBorderIcon />
                {data?.good_count}
              </button>
            )}
          </div>
          <div className="mb-3 inline-block rounded border border-gray-400 px-2">
            {data && data.userId === userId && (
              <button onClick={handleDelete}>削除</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
