import { getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";
import List from "@/components/list"
import Form from "@/components/form";

const Page = async () => {
	const session = await getPageSession();
	if (!session) redirect("/login");
	return (
		<>
			<List userId={session.user.userId} username={session.user.username}/>
			<Form action="/api/logout">
				<input type="submit" value="Sign out" />
			</Form>
		</>
	);
};

export default Page;
