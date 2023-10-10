import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth } from "../../../auth/lucia";

export const POST = async (request: NextRequest) => {
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
  // delete session cookie
  authRequest.setSession(null);
  return new Response(null, {
    headers: {
      Location: "/login", // redirect to login page
    },
    status: 302,
  });
};
