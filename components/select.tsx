"use client"
import React, { useEffect, useState } from 'react'
import List from "@/components/list"
import MyList from "@/components/mylist"


function select(props:any) {

    const {userId, username} = props;

    const [btn, setBtn] = useState(true)

    const handleSelectAll = () => {
        setBtn(true)
    }
    const handleSelectMy = () => {
        setBtn(false)
    }
    useEffect(() => {

    const all = document.getElementById("all")
    const my = document.getElementById("my")
    
    const effect = "border-b-2"
    if(all && my){
        if(btn === true){
            my.classList.remove(effect)
            all.classList.add(effect)
        }else{
            my.classList.add(effect)
            all.classList.remove(effect)
        }
    }
    },[btn]);
  return (
    <>
    <div className='flex  justify-between'>
        <div className='mt-3 w-1/2 text-white'>
            <button className='pb-1 w-4/6' id="all" onClick={handleSelectAll}>
                全ての投稿
            </button>
        </div>
        <div className='mt-3 w-1/2 text-white'>
            <button className='pb-1 w-4/6' id="my" onClick={handleSelectMy}>
                自分の投稿
            </button>
        </div>
    </div>
    {btn === true ? (
            <List userId={userId} username={username}/>
        ) : 
            <MyList userId={userId} username={username}/>
    }
    </>
  )
}

export default select