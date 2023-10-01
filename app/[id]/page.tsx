import { getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";
import Side from "@/components/side";
import Profile from "@/components/profile";

const Page = async () => {
	const session = await getPageSession();
	if (!session) redirect("/login");
	return (
		<>
			<div className="flex justify-around  items-top mb-7">
				<div className="w-1/4 bg-gray-500 h-[500px] rounded">
					<Side userId={session.user.userId} username={session.user.username}/>
				</div>
				<div className="w-2/3 bg-gray-500 mb-2 rounded">
					<div className='flex justify-center flex-col items-center'>
						<div className='w-11/12'>
							<Profile userId={session.user.userId}/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Page;
