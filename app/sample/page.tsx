"use client";
import React, { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
function page() {
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
    const file = e.target.files[0];
    const { data, error } = await supabase.storage
      .from("SNS_APP_IMG")
      .upload(`Acount_IMG/sample.png`, file);
    if (error) {
      // Handle error
    } else {
      // Handle success
    }
  };
  return (
    <>
      <div>
        <input type="file" onChange={handleImageChange} />
      </div>
    </>
  );
}
export default page;
