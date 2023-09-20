import { getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";
import List from "@/components/list"
import Form from "@/components/form";
import Layout from "@/components/layout";

const Page = async () => {
	const session = await getPageSession();
	if (!session) redirect("/login");
	return (
		<>
			<Layout userId={session.user.userId} username={session.user.username}/>
			<List userId={session.user.userId} username={session.user.username}/>
			<Form action="/api/logout">
				<input type="submit" value="Sign out" />
			</Form>
		</>
	);
};

export default Page;
