"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import ChatIcon from '@mui/icons-material/Chat';

interface Item {
    data: string;
    content: string;
  }

function profile_post() {

    const [data, setData] = useState<Item[]>([]);
    const [count, setCount] = useState("")
    const [urlid, setUrlId] = useState("")
    useEffect(() => {
        const url = location.pathname;
        const urlId = url.slice(1);
        setUrlId(urlId)
    },[])

    useEffect(() => {
        getProfileList()
    },[urlid])
    const getProfileList = async() => {
        const response = await fetch('http://localhost:3000/api/profile_list',{
        method: "POST",
        headers: {
            'Content-type':'application/json',
        },
        body: JSON.stringify(urlid)
        });
        if(!response.ok){
            console.log("ロード中にエラーが発生しました");
        }
        const data = await response.json();
        setData(data.list)
        setCount(data.count)
        console.log(data.list)

    }

  return (
    <>
    <div className='my-5'>
        {data.map((item:any) => (
            <div key ={item.id} className='bg-white my-5 px-4 text-left rounded'>
                <Link href={`/post?no=${item.id}`}>
                    <div className='flex justify-between items-center pt-3'>
                        <div className='font-bold'>{item.username}</div>
                        <div>{new Date(item.createdAt).toLocaleString()}</div>
                    </div>
                    <div className='my-1'>{item.content}</div>
                    <div className='pb-3'><ChatIcon /> {item.comment_count}</div>
                </Link>
            </div>
        ))}
    </div>
    </>
  )
}

export default profile_post