"use client"
import React, { useState, useEffect } from 'react'
import { useRouter,useSearchParams } from 'next/navigation'
import Link from "next/link";

const PostDetail = (props:any) => {

  const {userId} = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const post_no = searchParams.get("no")

  interface Data {
    user: {
        id: string;
        username: string;
    };
      id: number;
      content: string;
      userId: string;
      createdAt: Date;
  }
  const [data, setData] = useState<Data | null>(null);
  
  //投稿の削除
  const handleDelete = async() => {
    const log = confirm("投稿を削除しますか?");
      if(!log){
          return;
      }
    const response = await fetch(`http://localhost:3000/api/PostDelete?id=${post_no}`, {
      method: "DELETE",
    });
    if(!response.ok){
      console.error('HTTPエラー:', response.statusText);
    }else{
      router.back();
    }
  }
  useEffect(() =>{
    const feychLoard = async () =>{

      //投稿詳細コンポーネント
      const response = await fetch('http://localhost:3000/api/PostDetail', {
            method: "POST",
            headers: {
              'Content-type':'application/json',
            },
            body: JSON.stringify(post_no)
          });
          if(!response.ok){
            console.error('HTTPエラー:', response.statusText);
        }
        const element = await response.json();
        if(data === null) {
          setData(element.post);
        }
      }
      feychLoard()
  },[])

  return (
    <>
    <div className='flex justify-center items-center'>
      <div className='bg-white px-4 text-left w-11/12 rounded'>
        <div className='flex justify-between items-center pt-3'>
          <Link href={data ? data.user.id : ""} className="">
            <div className='font-bold'>{data ? data.user.username : null}</div>
          </Link>
          <div>{data ? new Date(data.createdAt).toLocaleString() : null}</div>
        </div>
        <div className='my-7'>{data ? data.content : null}</div>
        <div className='mb-3 border rounded px-2 border-gray-400 inline-block'>
          {data && data.userId === userId &&(
          <button onClick={handleDelete}>削除</button>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default PostDetail