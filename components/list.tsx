"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface Item {
    id: number;
    content: string;
  }

function list(props:any) {

    const {userId, username} = props;
    const [data, setData] = useState<Item[]>([]);

    const getList = async() => {
        const response = await fetch('http://localhost:3000/api');
        if(!response.ok){
            console.log("ロード中にエラーが発生しました");
        }
        const data = await response.json();
        setData(data.list)
    }
    //マウント時に更新
    useEffect(() => {
        getList();
    },[]);

  return (
    <>
    <div>Message_App</div>
    <p>【ユーザー名】</p>
    <p>{username}</p>
    <p>【ユーザーID】</p>
    <p>{userId}</p>
    <p>【メッセージ一覧】</p>
    <Link href={`/mylist?=${userId}`}>
        自分の投稿
    </Link>
    <ul>
    {data.slice().reverse().map((item) => (
        <li key ={item.id}>
            <p>{item.content}</p>
            <p>コメント数(1)</p>
        </li>
    ))}
    </ul>
    </>
  )
}


export default list