"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast'
import Link from "next/link";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

function profile(props:any) {

    const {userId} = props

    const router = useRouter();
    interface Item{
        username: string,
        production: string,
        id:string,
    }

    const [urlId, setUrlId] = useState("")
    
    useEffect(() => {
        const url = location.pathname;
        setUrlId(url.slice(1))
        if(urlId){
            getUserData()
        }
        const box:any = document.getElementById("editBox");
        setBoxid(box)

    },[urlId])

    const [userData, setUserData] = useState<Item>();
    const [followed, setFollowed] = useState("");
    const [followed_count, setFollowed_count] = useState("");
    const [followeder_count, setFolloweder_count] = useState("");

    const getUserData = async() => {
        const Id = urlId;
        const userData = {
            Id,
            userId
        }
        const response = await fetch('http://localhost:3000/api/userdata',{
            method: "POST",
            headers: {
            'Content-type':'application/json',
        },
            body:JSON.stringify(userData)
        });
        if(!response.ok){
            console.log("ロード中にエラーが発生しました");
        }
        const data = await response.json();
        setUserData(data.user)
        setFollowed(data.followed?.no)
        setFollowed_count(data.followed_count)
        setFolloweder_count(data.followeder_count)
        setName(data.user.username)
        setProduction(data.user.production)
    }

    const [boxid, setBoxid] = useState<any>("")
    const handleEditOpen = (e:any) => {
        e.preventDefault()
        if(boxid.classList.contains("hidden")){
            boxid.classList.remove("hidden")
        }else{
            boxid.classList.add("hidden")
        }
    }
    
    const [name, setName] = useState("")
    const [production, setProduction] = useState("")


    const handleEdit = async(e:any) => {
        e.preventDefault()
        toast.loading("更新中..", {id:"1"})
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const pr = formData.get('pr');
        const Data = {
            name,
            pr,
            urlId,
        }
        const response = await fetch('http://localhost:3000/api/edit_profile', {
            method: "PUT",
            body: JSON.stringify(Data),
            redirect: "manual"
        });
        if(response.ok){
            boxid.classList.add("hidden")
            getUserData()
            router.refresh();
            toast.success("プロフィールを更新しました", {id:"1"})
        }else{
            toast.error('プロフィールの更新に失敗しました', {id:"1"})
        }
    }
    //follow
    const followIdref = useRef<HTMLInputElement>(null)
    const followNameref = useRef<HTMLInputElement>(null)

    const handleFollow = async() => {
        const elementId = followIdref.current?.innerHTML
        const followId = elementId?.slice(1)
        const followName = followNameref.current?.innerHTML
        const FollowData = {
            followId,
            followName,
            userId,
        }
        const response = await fetch('http://localhost:3000/api/follow', {
            method: "PUT",
            body: JSON.stringify(FollowData),
        });
        if(response.ok){
            getUserData()
            router.refresh();
            toast.success("フォローしました", {id:"1"})
        }
    }
    //follow解除
    const handleUnFollow = async() => {
        const response = await fetch('http://localhost:3000/api/follow', {
            method: "POST",
            body: JSON.stringify(followed),
        });
        if(response.ok){
            getUserData()
            router.refresh();
            toast.success("フォローを解除しました", {id:"1"})
        }
    }
  return (
    <>
    <Toaster />
    {/* left-1/2 right-2/4 中央寄せ (position無でも可能)*/}
    <div className='w-[1900px] h-[1000px] bg-gray-400 bg-opacity-70 fixed left-0 top-0 hidden' id="editBox">
        <div className='flex flex-col items-center left-1/2 right-1/2 top-1/4 bottom-1/4 fixed'>
            <div className='w-[400px] h-[300px] bg-gray-500 rounded'>
                <div className='flex items-center justify-center w-full h-full'>
                    <div className='w-[375px] h-[275px] bg-white rounded'>
                        <div className='flex justify-center items-center w-full h-full'>
                            <form onSubmit={handleEdit} className='w-[325px] flex flex-col'>
                                <div className='mb-5 font-bold'>プロフィール情報編集</div>
                                <input type="text" className="pl-2 w-full h-11 mb-3" onChange={(e) => setName(e.target.value)} name="name" placeholder='新しいユーザー名を入力して下さい' required value={name || ""}/>
                                <input type="text" className="pl-2 w-full h-11 mb-3" onChange={(e) => setProduction(e.target.value)} name="pr" placeholder='自己紹介文を書こう' required value={production || ""}/>{/*{userData?.production}*/}
                                <div className='flex justify-center'>
                                    <button className='border py-1 mt-3 mx-3 px-3' onClick={handleEditOpen}>閉じる</button>
                                    <button className='border py-1 mt-3 mx-3 px-3'>更新</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
    <div className='flex flex-col items-center'>
        <Link href="./" className='w-full'>
            <div className="flex justify-start w-full">
                <p className="mt-5 mb-3 text-white"><ArrowLeftIcon/>プロフィール</p>
            </div>
        </Link>
        <div className='w-full px-4 py-5 rounded bg-white border'>
            <div className='flex mt-5 mb-10'>
                img
            </div>
            <div className='flex justify-between mb-5'>
                <div className='flex flex-col items-start'>
                    <div ref={followNameref}>{userData?.username}</div>
                    <div ref={followIdref}>@{userData?.id}</div>
                </div>
                {userData && userData.id === userId &&(
                    <button className="border py-1 px-3" onClick={handleEditOpen}>アカウント情報を編集</button>
                )}
            </div>
            <div className='flex flex-col items-start'>
                <div className='mb-5'>{userData?.production}</div>
                <div className='flex justify-between mb-3 w-full'>
                    <div className='flex justify-center items-center'>
                        <div className='mr-2'>{followed_count}フォロー</div>
                        <div>{followeder_count}フォロワー</div>
                    </div>
                    {userData && userData.id !== userId && !followed ? (
                        <button className="border py-1 px-3" onClick={handleFollow}>フォロー</button>
                    ) : (userData && userData.id !== userId &&(
                        <button className="border py-1 px-3" onClick={handleUnFollow}>フォロー解除</button>
                        )
                    )}
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default profile