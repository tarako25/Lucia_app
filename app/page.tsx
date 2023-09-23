import { getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";
import Select from "@/components/select"
import Side from "@/components/side";

const Page = async () => {
	const session = await getPageSession();
	if (!session) redirect("/login");
	return (
		<>
			<div className="flex justify-around items-top mb-7">
				<div className="w-1/4 bg-gray-500 h-[500px]">
					<Side userId={session.user.userId} username={session.user.username}/>
				</div>
				<div className="w-2/3 bg-gray-500">
					<div className='flex justify-center flex-col items-center'>
						<div className='w-11/12'>
							<Select userId={session.user.userId} username={session.user.username}/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Page;
