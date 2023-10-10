import { redirect } from "next/navigation";

import { getPageSession } from "../../auth/lucia";
import Profile from "../../components/Profile";
import ProfilePost from "../../components/ProfilePost";
import SideBar from "../../components/SideBar";

const Page = async () => {
  const session = await getPageSession();
  if (!session) {
    redirect("/login");
  } else if (session.user.delete_flg == 1) {
    redirect("/login");
  }
  return (
    <>
      <div className="items-top mb-5  flex justify-around">
        <div className="h-[500px] w-1/4 rounded bg-gray-500">
          <SideBar
            userId={session.user.userId}
            username={session.user.username}
          />
        </div>
        <div className="w-2/3 rounded bg-gray-500">
          <div className="flex flex-col items-center justify-center">
            <div className="w-11/12">
              <Profile userId={session.user.userId} />
              <ProfilePost userId={session.user.userId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
