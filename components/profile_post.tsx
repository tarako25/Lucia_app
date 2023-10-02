import React from 'react'
import Link from "next/link";
import ChatIcon from '@mui/icons-material/Chat';

function profile_post() {
  return (
    <>
    <Link href="/">
        <div className='w-full px-4 pb-4 mt-5 rounded bg-white border'>
            <div>
                <div className='flex justify-between items-center pt-3'>
                    <div className='font-bold'>修正箇所</div>
                    <div>2023/09/29</div>
                </div>
                <div className='flex flex-col items-start'>
                    <div className='mb-2 mt-1'>よろしく</div>
                    <div className=''><ChatIcon />3</div>
                </div>
            </div>
        </div>
    </Link>
    </>
  )
}

export default profile_post