import React from 'react'

function profile(props:any) {

    const {userId, username} = props;

  return (
    <div className='flex flex-col items-center'>
        <div className='w-full mt-5 px-4 py-5 rounded bg-white border'>
            <div className='flex mt-5 mb-10'>
                img
            </div>
            <div className='flex justify-between mb-5'>
                <div>名前</div>
                <div>アカウント情報を編集</div>
            </div>
            <div className='flex flex-col items-start'>
                <div className='mb-5'>よろしくお願いします</div>
                <div className='flex'>
                    <div>2フォロー</div>
                    <div>2フォロワー</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default profile