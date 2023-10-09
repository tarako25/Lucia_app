import { auth } from "@/auth/lucia";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function DB(){
    try {
        await prisma.$connect();
    } catch (error) {
        return Error("DB接続に失敗しました")
    }
}

export const POST = async (request: NextRequest, res:NextResponse) => {
	const authRequest = auth.handleRequest({ request, cookies });
	// check if user is authenticated
	const session = await authRequest.validate();
	if (!session) {
		return new Response("Unauthorized", {
			status: 401
		});
	}
	// make sure to invalidate the current session!
	await auth.invalidateSession(session.sessionId);
	try {
        await DB();
		const userId = session.user.userId
		await prisma.user.update({
			where: {
				id:userId,
			},
			data: {
				delete_flg: 1
			}
		})
        return NextResponse.json({ message: "Success"}, {status: 201});
    } catch (err) {
        return NextResponse.json({ message: "Error", err}, {status: 500});
    } finally {
        await prisma.$disconnect();

		// delete session cookie
		authRequest.setSession(null);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/login" // redirect to login page
			}
		});
    }

};