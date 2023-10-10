import { LuciaError } from "lucia";
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
    username.length < 1 ||
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
    password.length < 1 ||
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
    // find user by key
    // and validate password
    const key = await auth.useKey("username", username.toLowerCase(), password);
    const session = await auth.createSession({
      attributes: {},
      userId: key.userId,
    });
    const authRequest = auth.handleRequest({
      cookies,
      request,
    });
    authRequest.setSession(session);
    if (session.user.delete_flg == 1) {
      return NextResponse.json(
        {
          error:
            "アカウントは現在停止しています。問い合わせフォームまで問い合わせ下さい",
        },
        {
          status: 400,
        }
      );
    }
    return new Response(null, {
      headers: {
        Location: "/", // redirect to profile page
      },
      status: 302,
    });
  } catch (e) {
    if (
      e instanceof LuciaError &&
      (e.message === "AUTH_INVALID_KEY_ID" ||
        e.message === "AUTH_INVALID_PASSWORD")
    ) {
      // user does not exist
      // or invalid password
      return NextResponse.json(
        {
          error: "ユーザーネームかパスワードが正しくありません",
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      {
        error: "予期せぬエラー",
      },
      {
        status: 500,
      }
    );
  }
};
