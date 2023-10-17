import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getPageSession } from "@/auth/lucia";
import PostComment from "@/components/PostComment";
import PostDetail from "@/components/PostDetail";
import SideBar from "@/components/SideBar";

const Page = async () => {
  const session = await getPageSession();
  if (!session) {
    redirect("/login");
  } else if (session.user.delete_flg == 1) {
    redirect("/login");
  }
  return (
    <>
      <div className="flex justify-around">
        <div className="h-[500px] w-1/4 rounded bg-gray-500">
          <SideBar
            userId={session.user.userId}
            username={session.user.username}
          />
        </div>
        <div className="w-2/3 rounded bg-gray-500">
          <Link href="./" className="w-full">
            <div className="flex justify-center text-left">
              <p className="mb-3 mt-5 w-11/12 text-white">
                <ArrowLeftIcon /> 投稿
              </p>
            </div>
          </Link>
          <PostDetail
            userId={session.user.userId}
            username={session.user.username}
          />
          <PostComment
            userId={session.user.userId}
            username={session.user.username}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
