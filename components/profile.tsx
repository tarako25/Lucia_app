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
    <div className='w-[1900px] h-[1000px] bg-gray-400 bg-opacity-70 fixed left-0 top-0'>
        <div className='flex flex-col items-center left-1/2 right-1/2 top-1/4 bottom-1/4 fixed'>
            <div className='w-[400px] h-[300px] bg-gray-500 rounded'>
                <div className='flex items-center justify-center w-full h-full'>
                    <div className='w-[375px] h-[275px] bg-white rounded'>
                        <div className='flex justify-center items-center w-full h-full'>
                            <div className='w-[325px] flex flex-col'>
                                <div className='mb-5 font-bold'>ユーザー情報編集</div>
                                <input type="text" className="pl-2 w-full h-11 mb-3" placeholder='新しいユーザー名を入力して下さい' required value={userData?.username}/>
                                <input type="text" className="pl-2 w-full h-11 mb-3" placeholder='自己紹介文を書こう' required value={userData?.production}/>
                                <div className='flex justify-end'>
                                    <button className='border py-1 px-3'>更新</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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