"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import Pagination from '@mui/material/Pagination';
import { PageElement } from '@/lib/pagenation';
import toast, { Toaster } from 'react-hot-toast'
interface Item {
    id: number;
    content: string;
    comment_count: number;
    username: string;
    createdAt: Date;
  }

  function PostMyList(props:any) {

      const {userId, username} = props;
      const [data, setData] = useState<Item[]>([]);

      //メッセージ送信
      const handleSubmit = async(e:any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const message = formData.get('msg');
        const Data = {
            message,
            userId,
            username,
        }
        toast.loading("投稿中..", {id:"1"})
        const response = await fetch('http://localhost:3000/api/SubmitPost', {
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
    toast.success("投稿しました", {id:"1"})
    }

    //ページネーション
    const Pageitem = PageElement

    const [start, setStart] = useState(0);
    const[page, setPage] = useState(1);
    const[pagecount, pageCount] = useState(1);

    const handlePage = (page:any) => {
        setPage(page);
        const start_e = (page-1) * Pageitem
        setStart(start_e);
    }

    //ページリスト表示(自分の投稿)
    const getMyList = async() => {
        const response = await fetch('http://localhost:3000/api/PostMyList',{
        method: "POST",
        headers: {
            'Content-type':'application/json',
        },
        body: JSON.stringify(Page_data)
        });
        if(!response.ok){
            console.log("ロード中にエラーが発生しました");
        }
        const data = await response.json();
        setData(data.mylist)

        //ページ数計算
        const count = Math.ceil(data.count / Pageitem);
        pageCount(count)
    }

    //ページがsetされた時
    useEffect(() => {
        getMyList()
    },[start])

    const Page_data = {
        userId,
        start,
        Pageitem,
    }

    //マウント時に更新
    useEffect(() => {
        getMyList();
    },[]);

  return (
    <>
    <Toaster />
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
                    <div className='pb-3'><ChatIcon /> {item.comment_count}</div>
                </Link>
            </div>
        ))}
    </div>
    <div className='flex items-center justify-center'>
        <div className='mb-7'>
            <Pagination count={pagecount} color="primary" page={page} onChange={(e, page) =>handlePage(page)}/>
        </div>
    </div>
    </>
  )
}


export default PostMyList