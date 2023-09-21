import { getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";
import List from "@/components/list"
import Side from "@/components/side";

const Page = async () => {
	const session = await getPageSession();
	if (!session) redirect("/login");
	return (
		<>
			<div className="flex justify-around items-top">
				<div className="w-1/5 bg-gray-500">
					<Side userId={session.user.userId} username={session.user.username}/>
				</div>
				<div className="w-4/6 bg-gray-500">
					<List userId={session.user.userId} username={session.user.username}/>
				</div>
			</div>
		</>
	);
};

export default Page;
