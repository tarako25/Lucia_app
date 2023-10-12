import { prisma } from "@lucia-auth/adapter-prisma";
import { lucia } from "lucia";
import { nextjs } from "lucia/middleware";
import { cookies } from "next/headers";
import { cache } from "react";

import prisma_C from "@/lib/prisma";

export const auth = lucia({
  adapter: prisma(prisma_C, {
    key: "key", // model Key {}
    session: "session", // model Session {}
    user: "user", // model User {}
  }),
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  getUserAttributes: (data) => {
    return {
      delete_flg: data.delete_flg,
      username: data.username,
    };
  },
  middleware: nextjs(),
  sessionCookie: {
    expires: false,
  },
});

export type Auth = typeof auth;

export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest({
    cookies,
    request: null,
  });
  return authRequest.validate();
});
