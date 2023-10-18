import { redirect } from "next/navigation";
import React from "react";

import { getPageSession } from "@/auth/lucia";
import DirectMessage from "@/components/DirectMessage";
import SideBar from "@/components/SideBar";

const Page = async () => {
  const session = await getPageSession();
  if (!session) {
    redirect("/login");
  } else if (session.user.delete_flg == 1) {
    redirect("/login");
  }

  return (
    <div className="mb-7 flex justify-around">
      <div className="h-[600px] w-1/4 rounded bg-gray-500">
        <SideBar
          userId={session.user.userId}
          username={session.user.username}
        />
      </div>
      <div className="mb-2 w-2/3 rounded bg-gray-500">
        <div className="flex flex-col items-center justify-center">
          <div className="w-11/12"></div>
        </div>
      </div>
    </div>
  );
};

export default Page;
