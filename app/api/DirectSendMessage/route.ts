import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { getPageSession } from "@/auth/lucia";
import prisma_C from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const session = await getPageSession();
    const formData = await req.formData();
    const message = formData.get("message");
    const uerId = session?.user.userId;
    const username = session?.user.username;
    const url = new URL(req.url);
    const targetId = url.searchParams.get("id");
    //日付作成
    const now = new Date();
    //ISO形式に変換
    const nowISO8601 = now.toISOString();
    //schemで登録した名前ではない
    //directmessageで登録すると勝手にdirectMessageのように変換されるため補完機能で書く
    const userdata = await prisma_C.user.findFirst({
      where: {
        id: String(targetId),
      },
    });
    const targetname = userdata?.username;
    await prisma_C.directMessage.create({
      data: {
        content: String(message),
        createdAt: nowISO8601,
        username: String(username),
        targetname: String(targetname),
        targetId: String(targetId),

        user: {
          connect: {
            id: uerId, // ここで関連するユーザーのIDを指定
          },
        },
      },
    });
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma_C.$disconnect();
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const session = await getPageSession();
    const uerId = session?.user.userId;
    const url = new URL(req.url);
    const targetId = url.searchParams.get("id");

    const data = await prisma_C.directMessage.findMany({
      where: {
        targetId: {
          in: [String(uerId), String(targetId)],
        },
        userId: {
          in: [String(uerId), String(targetId)],
        },
      },
      orderBy: {
        createdAt: "desc", // createdAt フィールドで降順に並べ替える
      },
      take: 20,
    });
    return NextResponse.json({ data, message: "Success" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma_C.$disconnect();
  }
}
