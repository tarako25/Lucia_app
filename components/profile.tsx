"use client"
import React, { useEffect, useState } from 'react'

function profile(props:any) {

    const {userId, username} = props;

    interface Item{
        username: string,
        production: string
    }
    const [userData, setUserData] = useState<Item>();

    const getUserData = async() => {
        const Id = userId
        const response = await fetch('http://localhost:3000/api/userdata',{
            method: "POST",
            headers: {
            'Content-type':'application/json',
        },
            body:JSON.stringify(Id)
        });
        if(!response.ok){
            console.log("ロード中にエラーが発生しました");
        }
        const data = await response.json();
        setUserData(data.user)
        console.log(data.user)
    }
    useEffect(() => {
        getUserData()
    },[])

    const handleEdit = () => {
        
    }
  return (
    <>
    {/* left-1/2 right-2/4 中央寄せ (position無でも可能)*/}
    <div className='flex flex-col items-center fixed hidden'>
        <div className='w-[400px] h-[300px] left-1/2 right-2/4 bg-yellow-200'>
            <div>{userData?.username}</div>
        </div>
    </div>
    <div className='flex flex-col items-center'>
        <div className='w-full mt-5 px-4 py-5 rounded bg-white border'>
            <div className='flex mt-5 mb-10'>
                img
            </div>
            <div className='flex justify-between mb-5'>
                <div>{userData?.username}</div>
                <button onClick={handleEdit}>アカウント情報を編集</button>
            </div>
            <div className='flex flex-col items-start'>
                <div className='mb-5'>{userData?.production}</div>
                <div className='flex'>
                    <div className='mr-2'>2フォロー</div>
                    <div>2フォロワー</div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default profile