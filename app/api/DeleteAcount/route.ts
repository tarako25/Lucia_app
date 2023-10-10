import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth } from "../../../auth/lucia";
import prisma from "../../../lib/prisma";

export const POST = async (request: NextRequest, res: NextResponse) => {
  const authRequest = auth.handleRequest({ cookies, request });
  // check if user is authenticated
  const session = await authRequest.validate();
  if (!session) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  // make sure to invalidate the current session!
  await auth.invalidateSession(session.sessionId);
  try {
    const userId = session.user.userId;
    await prisma.user.update({
      data: {
        delete_flg: 1,
      },
      where: {
        id: userId,
      },
    });
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();

    // delete session cookie
    authRequest.setSession(null);
    return new Response(null, {
      headers: {
        Location: "/login", // redirect to login page
      },
      status: 302,
    });
  }
};
