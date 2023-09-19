"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface Item {
    id: number;
    content: string;
    no: number;
    comment_id: number;
    createdAt: Date;
  }


const comment = (props:any) => {

    const {userId} = props;
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
            post_no
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

    //Get
    const getComent = async() => {
        const response = await fetch('http://localhost:3000/api/comment', {
        method: "POST",
        headers: {
          'Content-type':'application/json',
        },
        body: JSON.stringify(post_no)
        });
        if(!response.ok){
            console.log("ロード中にエラーが発生しました");
        }
        const data = await response.json();
        setData(data.comment)
        console.log(data)
    }
    //マウント時に更新
    useEffect(() => {
        getComent();
    },[]);

    return(
        <>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" name="msg"/>
            <input type="submit" />
         </form>
        <ul>
            {data.slice().reverse().map((item) => (
            <div key ={item.comment_id}>
                <p>{new Date(item.createdAt).toLocaleString()}</p>
                <p>{item.content}</p>
            </div>
            ))}
        </ul>
        </>
    )
}
export default comment