import { getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";

import LogForm from "@/components/LogForm";
import Link from "next/link";

const Page = async () => {
	const session = await getPageSession();
	if (session && session.user.delete_flg == 0) {
			redirect("/");
	}

	return (
		<>
			<h1>Sign in</h1>
			<LogForm action="/api/LogIn">
				<label htmlFor="username">Username</label>
				<input name="username" id="username" />
				<br />
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />
				<br />
				<input type="submit" />
			</LogForm>
			<Link href="/signup">Create an account</Link>
		</>
	);
};

export default Page;
