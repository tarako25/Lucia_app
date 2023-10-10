import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { lucia } from "lucia";
import { nextjs } from "lucia/middleware";
import { cookies } from "next/headers";
import { cache } from "react";

const client = new PrismaClient();

export const auth = lucia({
  adapter: prisma(client, {
    key: "key", // model Key {}
    session: "session", // model Session {}
    user: "user", // model User {}
  }),
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  getUserAttributes: (data) => {
    return {
      delete_flg: data.delete_flg,
      //よく分からん
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
