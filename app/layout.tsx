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
			<div className="flex justify-center text-center h-screen">
				<div className="w-10/12 bg-slate-100">
					<div className="text-3xl font-bold my-14">Message_App</div>
					{children}
				</div>
			</div>
			</body>
		</html>
	);
}
