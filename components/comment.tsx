"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Pagination from '@mui/material/Pagination';
interface Item {
    id: number;
    content: string;
    no: number;
    comment_id: number;
    createdAt: Date;
    username: string;
  }


const comment = (props:any) => {

    const {userId, username} = props;
    const [data, setData] = useState<Item[]>([]);

    const searchParams = useSearchParams();
    const post_no = searchParams.get("no")

    const handleSubmit = async(e:any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const message = formData.get('msg');
        const Data = {
            message,
            userId,
            post_no,
            username,
        }
        const response = await fetch('http://localhost:3000/api/input_comment', {
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
    getComent();
    }

    //Pagenation
    const Pageitem = 10;

    const [start, setStart] = useState(0);
    const[page, setPage] = useState(1);
    const[pagecount, pageCount] = useState(1);

    const handlePage = (page:any) => {
        setPage(page);
        const start_e = (page-1) * Pageitem
        setStart(start_e);
    }

    //Get
    const getComent = async() => {
        const response = await fetch('http://localhost:3000/api/comment', {
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
        setData(data.comment)
        console.log(data)
        //ページ数計算
        const count = Math.ceil(data.count / Pageitem);
        pageCount(count)
    }
     //ページがsetされた時
     useEffect(() => {
        getComent()
    },[start])

    const Page_data = {
        post_no,
        start,
        Pageitem,
    }

    //マウント時に更新
    useEffect(() => {
        getComent();
    },[]);

    return(
        <>
        <div className='flex flex-col items-center'>
            <form onSubmit={handleSubmit} className='w-11/12'>
                {/*のちにjsでtextareaの高さ自動可変にする*/}
                <textarea
                    className='w-full mt-4 px-4 py-5 rounded border-gray-400 border'
                    name="msg"
                    placeholder='メッセージを入力して下さい'>
                </textarea>
                <div className='flex justify-end w-full'>
                    <input className='bg-white mt-2 px-5 py-1 rounded border-gray-400 border' type="submit" />
                </div>
            </form>
            <div className='my-5 w-11/12'>
            {data.map((item) => (
                <div key ={item.comment_id} className='bg-white my-5 px-4 text-left rounded'>
                    <div>
                        <div className='flex justify-between items-center pt-3'>
                            <div className='font-bold'>{item.username}</div>
                            <div>{new Date(item.createdAt).toLocaleString()}</div>
                        </div>
                        <div className='mt-2 pb-6'>{item.content}</div>
                    </div>
                </div>
            ))}
            </div>
                <div className='mb-7'>
                    <Pagination count={pagecount} color="primary" page={page} onChange={(e, page) =>handlePage(page)}/>
                </div>
            </div>
        </>
    )
}
export default comment