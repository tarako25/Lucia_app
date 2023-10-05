import { getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";

import LogForm from "@/components/LogForm";
import Link from "next/link";

const Page = async () => {
	const session = await getPageSession();
	if (session) redirect("/");
	return (
		<>
			<h1>Sign up</h1>
			<LogForm action="/api/SignUp">
				<label htmlFor="username">Username</label>
				<input name="username" id="username" />
				<br />
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />
				<br />
				<input type="submit" />
			</LogForm>
			<Link href="/login">Sign in</Link>
		</>
	);
};

export default Page;
