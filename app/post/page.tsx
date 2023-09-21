import { getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";
import Post from "@/components/post";
import Form from "@/components/form";
import Link from "next/link";
import Comment from "@/components/comment";
import Side from "@/components/side";

const Page = async () => {
	const session = await getPageSession();
	if (!session) redirect("/login");
	return (
		<>
		<Side userId={session.user.userId} username={session.user.username}/>
    	<Post userId={session.user.userId} username={session.user.username}/>
		<Comment userId={session.user.userId}/>
		<Link  href="././">
			戻る
		</Link>
		<Form action="/api/logout">
			<input type="submit" value="Sign out" />
		</Form>
	</>
	);
};

export default Page;