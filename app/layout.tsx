import Link from "next/link";
import "./globals.css";

export const metadata = {
	title: "Username and password auth with Lucia"
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
			<div className="relative">
				<div className="flex justify-center text-center">
					<div className="w-[900px] h-full">
						<Link href="./">
							<div className="text-3xl font-bold my-14">Message_App</div>
						</Link>
						{children}
					</div>
				</div>
			</div>
			</body>
		</html>
	);
}
