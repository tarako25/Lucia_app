import { getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";
import SideBar from "@/components/SideBar";
import GoodPost from "@/components/GoodPost";

const Page = async () => {
	const session = await getPageSession();
	if (!session) redirect("/login");
	return (
		<>
		<div className="flex justify-around  items-top mb-5">
			<div className="w-1/4 bg-gray-500 h-[500px] rounded">
				<SideBar userId={session.user.userId} username={session.user.username}/>
			</div>
			<div className="w-2/3 bg-gray-500 rounded">
				<div className='flex justify-center flex-col items-center'>
					<div className='w-11/12'>
						<GoodPost userId={session.user.userId}/>
					</div>
				</div>
			</div>
		</div>
		</>
	);
};

export default Page;
