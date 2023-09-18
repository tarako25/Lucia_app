"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface Item {
    id: number;
    content: string;
    no: number;
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
        const response = await fetch('http://localhost:3000/api');
        if(!response.ok){
            console.log("ロード中にエラーが発生しました");
        }
        const data = await response.json();
        setData(data.list)
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
            <Link key ={item.id} href="error">
                <p>{item.content}</p>
                <p>コメント数(1)</p>
            </Link>
            ))}
        </ul>
        </>
    )
}
export default comment