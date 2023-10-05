import { getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";
import PostDetail from "@/components/PostDetail";
import PostComment from "@/components/PostComment";
import SideBar from "@/components/SideBar";
import Link from "next/link";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const Page = async () => {
	const session = await getPageSession();
	if (!session) redirect("/login");
	return (
		<>
		<div className="flex justify-around items-top">
			<div className="w-1/4 bg-gray-500 h-[500px] rounded">
				<SideBar userId={session.user.userId} username={session.user.username}/>
			</div>
			<div className="w-2/3 bg-gray-500 rounded">
				<Link href="./" className='w-full'>
					<div className="flex justify-center text-left">
						<p className="w-11/12 mt-5 mb-3 text-white"><ArrowLeftIcon/> 投稿</p>
					</div>
				</Link>
				<PostDetail userId={session.user.userId} username={session.user.username}/>
				<PostComment userId={session.user.userId} username={session.user.username}/>
			</div>
		</div>
	</>
	);
};

export default Page;