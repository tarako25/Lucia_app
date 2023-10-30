"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
function page() {
  const [img, setImg] = useState(
    "https://qyecgulkarzfwziludjh.supabase.co/storage/v1/object/public/avatars/sample.png"
  );

  // Create Supabase client
  const supabase = createClient(
    "https://qyecgulkarzfwziludjh.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5ZWNndWxrYXJ6Znd6aWx1ZGpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc1NDU5MTUsImV4cCI6MjAxMzEyMTkxNX0.wklN0pvj5FBfref2w-8aXVJbVrnvXJgggTQXGQOkcJc"
  );
  const handleImageChange = async (e: any) => {
    if (!e.target.files || e.target.files.length == 0) {
      // 画像が選択されていないのでreturn
      return;
    }
    await supabase.storage.from("avatars").remove(["sample.png"]);

    const file = e.target.files[0];
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload("sample.png", file, {
        cacheControl: "1",
        upsert: true,
      });
    if (error) {
      // Handle error
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <input type="file" onChange={handleImageChange} />
        <p>写真</p>
        <img src={img} />
      </div>
    </>
  );
}
export default page;
