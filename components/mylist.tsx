"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface Item {
    id: number;
    content: string;
  }

function mylist(props:any) {

    const {userId, username} = props;
    const [data, setData] = useState<Item[]>([]);

    const getMyList = async() => {
        const response = await fetch('http://localhost:3000/api/mylist', {
          method: "POST",
          headers: {
            'Content-type':'application/json',
          },
          body: JSON.stringify(userId)
        });
        if(!response.ok){
            console.log("ロード中にエラーが発生しました");
        }
        const data = await response.json();
        setData(data.mylist)
    }
    //マウント時に更新
    useEffect(() => {
        getMyList();
    },[]);

  return (
    <>
    <div>Message_App</div>
    <p>【ユーザー名】</p>
    <p>{username}</p>
    <p>【ユーザーID】</p>
    <p>{userId}</p>
    <p>【メッセージ一覧】</p>
    <Link href="/">
        全ての投稿
    </Link>
    <ul>
    {data.slice().reverse().map((item) => (
        <li key ={item.id}>
            <p>{item.content}</p>
        </li>
    ))}
    </ul>
    </>
  )
}


export default mylist