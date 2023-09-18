import { getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";
import Post from "@/components/post";
import Form from "@/components/form";
import Link from "next/link";
import Comment from "@/components/comment";

const Page = async () => {
	const session = await getPageSession();
	if (!session) redirect("/login");
	return (
		<>
    	<Post userId={session.user.userId} username={session.user.username}/>
		<Link  href="././">
			戻る
		</Link>
		<Comment userId={session.user.userId}/>
		<Form action="/api/logout">
			<input type="submit" value="Sign out" />
		</Form>
	</>
	);
};

export default Page;