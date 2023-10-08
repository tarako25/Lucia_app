"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import ChatIcon from '@mui/icons-material/Chat';
import Pagination from '@mui/material/Pagination';
import { PageElement } from '@/lib/pagenation';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
interface Item {
    data: string;
    content: string;
  }

function ProfilePost() {

    const [data, setData] = useState<Item[]>([]);
    const [count, setCount] = useState("")
    const [urlid, setUrlId] = useState("")

    //URLからプロフィールID取得
    useEffect(() => {
        const url = location.pathname;
        const urlId = url.slice(1);
        setUrlId(urlId)
    },[])

    //ページネーション
    const Pageitem = PageElement

    const [start, setStart] = useState(0);
    const[page, setPage] = useState(1);
    const[pagecount, pageCount] = useState(1);

    const handlePage = (page:number) => {
        setPage(page);
        const start_e = (page-1) * Pageitem
        setStart(start_e);
    }

    //Profile投稿取得
    const getProfileList = async() => {
        const Page_data = {
            start,
            Pageitem,
            urlid,
        }
        const response = await fetch('http://localhost:3000/api/ProfilePostList',{
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
        setData(data.list)
        setCount(data.count)
        
         //ページ数計算
         const count = Math.ceil(data.count / Pageitem);
         pageCount(count)
    }
    //ページがsetされた時かurlidをセットされた時
    useEffect(() => {
        //if付けないとたまに取得できない
        if (urlid) {
            getProfileList()
        }
    },[start,urlid])

    //Favorite

    const handleGood = async(e:any, no :number) => {
        e.preventDefault();
        const userId = urlid
        const PostData = {
            userId,
            no,
        }
        const response = await fetch('http://localhost:3000/api/PostGood',{
        method: "POST",
        headers: {
            'Content-type':'application/json',
        },
        body: JSON.stringify(PostData)
        });
        if(!response.ok){
            console.error('HTTPエラー:', response.statusText);
        }
        getProfileList();
    }
    const handleCancelGood = async(e:any, no :number) => {
        e.preventDefault();
        const PostData = {
            urlid,
            no,
        }
        const response = await fetch('http://localhost:3000/api/PostGood',{
        method: "PUT",
        headers: {
            'Content-type':'application/json',
        },
        body: JSON.stringify(PostData)
        });
        if(!response.ok){
            console.error('HTTPエラー:', response.statusText);
        }
        getProfileList();
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
                    <div className='flex items-center pb-3'>
                        <div className='mr-3'><ChatIcon /> {item.comment_count}</div>
                        {/*既にGoodが押されているかのチェック */}
                        {item.good.some((goodItem:any) => goodItem.userId == urlid) ? (
                            <button onClick = {(e) => handleCancelGood(e, item.id)}><FavoriteIcon />{item.good_count}</button>
                        ) : (
                            <button onClick = {(e) => handleGood(e, item.id)}><FavoriteBorderIcon />{item.good_count}</button>
                        )}
                    </div>
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

export default ProfilePost