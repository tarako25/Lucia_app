"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const LogForm = ({
	children,
	action
}: {
	children: React.ReactNode;
	action: string;
}) => {
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState<null | string>(null);
	return (
		<>
			<form
				action={action}
				method="post"
				onSubmit={async (e) => {
					e.preventDefault();
					//ログアウトの場合アラート出す
					if(action == "/api/LogOut"){
					const log = confirm("ログアウトしてもよろしいですか?");
					if(!log){
						return;
						}
					}
					setErrorMessage(null);
					const formData = new FormData(e.currentTarget);
					const response = await fetch(action, {
						method: "POST",
						body: formData,
						redirect: "manual"
					});
					if (response.status === 0) {
						return router.refresh();
					}
					if (!response.ok) {
						const result = (await response.json()) as {
							error?: string;
						};
						setErrorMessage(result.error ?? null);
					}
				}}
			>
				{children}
			</form>
			{errorMessage && <p className="error">{errorMessage}</p>}
		</>
	);
};

export default LogForm;