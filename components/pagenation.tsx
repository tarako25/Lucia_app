"use client"
import Link from 'next/link'
import React, {useState} from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import Pagination from '@mui/material/Pagination';

const pagenation = (props:any) => {

  const {data, handleSubmit} = props

  const [page, setPage] = useState(1)
  
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
        {data.map((item:any) => (
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
    <Pagination count={10} color="primary" page={page}  onChange={(e, page) => setPage(page)} />
    </>
  )
}

export default pagenation