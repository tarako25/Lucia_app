'use client';
import React from 'react'

const input = (props:any) =>{

    const {userId, username} = props;
    const handleSubmit = async(e:any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const message = formData.get('msg');
        const Data = {
            message,
            userId
        }
        const response = await fetch('http://localhost:3000/api/input', {
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
    }

    return(
        <>
        <div>Message_App</div>
			<p>【ユーザー名】</p>
			<p>{username}</p>
			<p>【ユーザーID】</p>
			<p>{userId}</p>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" name="msg"/>
            <input type="submit" />
        </form>
        </>
    )
}

export default input