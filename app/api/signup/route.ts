import { SqliteError } from "better-sqlite3";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth } from "../../../auth/lucia";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  // basic check

  if (
    typeof username !== "string" ||
    username.length < 4 ||
    username.length > 31
  ) {
    return NextResponse.json(
      {
        error: "Invalid username",
      },
      {
        status: 400,
      }
    );
  }
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return NextResponse.json(
      {
        error: "Invalid password",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const user = await auth.createUser({
      attributes: {
        username,
      },
      key: {
        password, // hashed by Lucia
        providerId: "username", // auth method
        providerUserId: username.toLowerCase(), // unique id when using "username" auth method
      },
    });
    const session = await auth.createSession({
      attributes: {},
      userId: user.userId,
    });
    const authRequest = auth.handleRequest({
      cookies,
      request,
    });
    authRequest.setSession(session);
    return new Response(null, {
      headers: {
        Location: "/", // redirect to profile page
      },
      status: 302,
    });
  } catch (e) {
    console.error(e);
    if (e instanceof SqliteError && e.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return NextResponse.json(
        {
          error: "Username already taken",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        error: "An unknown error occurred",
      },
      {
        status: 500,
      }
    );
  }
};
