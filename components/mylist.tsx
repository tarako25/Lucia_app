"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface Item {
    id: number;
    content: string;
    comment_count: number;
    username: string;
    createdAt: Date;
  }

  function mylist(props:any) {

      const {userId, username} = props;
      const [data, setData] = useState<Item[]>([]);

      //input
      const handleSubmit = async(e:any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const message = formData.get('msg');
        const Data = {
            message,
            userId,
            username,
        }
        const response = await fetch('http://localhost:3000/api/input', {
        method: "POST",
        headers: {
          'Content-type':'application/json',
        },
        body: JSON.stringify(Data)
    });
    e.target.reset();
    if(!response.ok){
        console.log("ロード中にエラーが発生しました");
    }
    getMyList();
    }

    //get
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
    <form onSubmit={handleSubmit} className='flex flex-col items-center'>
        {/*のちにjsでtextareaの高さ自動可変にする*/}
        <textarea
            className='w-full mt-5 px-4 py-5 rounded border-gray-400 border'
            name="msg"
            placeholder='メッセージを入力して下さい'>
        </textarea>
        <div className='flex justify-end w-full'>
            <input className='bg-white mt-2 px-5 py-1 rounded border-gray-400 border' type="submit" />
        </div>
    </form>
    <div className='my-5'>
        {data.map((item) => (
            <div key ={item.id} className='bg-white my-5 px-4 text-left rounded'>
                <Link href={`/post?no=${item.id}`}>
                    <div className='flex justify-between items-center pt-3'>
                        <div className='font-bold'>{item.username}</div>
                        <div>{new Date(item.createdAt).toLocaleString()}</div>
                    </div>
                    <div className='my-1'>{item.content}</div>
                    <div className='pb-3'>コメント数({item.comment_count})</div>
                </Link>
            </div>
        ))}
    </div>
    </>
  )
}


export default mylist