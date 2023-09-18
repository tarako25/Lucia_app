"use client"
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const page = () => {


  /*
  const searchParams = useSearchParams();
  const a = searchParams.get("no")
  console.log(a);
  */
  interface Data {
    user: {
        id: string;
        username: string;
    };
      id: number;
      content: string;
      userId: string;
  }
  const [data, setData] = useState<Data | null>(null);

  useEffect(() =>{
    const feychLoard = async () =>{
      const currentURL = window.location.href;
      const url = new URL(currentURL);
      const post_no = url.searchParams.get("no");

      //api(GET)
      const response = await fetch('http://localhost:3000/api/post', {
            method: "POST",
            headers: {
              'Content-type':'application/json',
            },
            body: JSON.stringify(post_no)
          });
          if(!response.ok){
            console.log("ロード中にエラーが発生しました");
        }
        const element = await response.json();
        if(data === null) {
          setData(element.post);
        }
      }
      feychLoard()
  },[])
  console.log(data)

  return (
    <>
    <div>
      <p>
      {data ? data.user.username : null}
      </p>
      <p>
        {data ? data.content : null}
      </p>
    </div>
    </>
  )
}

export default page