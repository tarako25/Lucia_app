import { NextRequest, NextResponse } from "next/server";

import prisma_C from "@/lib/prisma";

export async function POST(req: Request, res: NextResponse) {
  try {
    const data = await req.json();
    const msg = data.message;
    const user_id = data.userId;
    const post_no = data.post_no;
    const username = data.username;
    //日付作成
    const now = new Date();
    //ISO形式に変換
    const nowISO8601 = now.toISOString();
    const comment = await prisma_C.comment.create({
      data: {
        content: msg,
        //ISO形式のみ(保存時はISOで＋1hなってるいるがフロントで変換している)
        createdAt: nowISO8601,
        message: {
          connect: {
            id: Number(post_no), // ここで関連するユーザーのIDを指定
          },
        },
        user: {
          connect: {
            id: user_id, // ここで関連するユーザーのIDを指定
          },
        },
        username: username,
      },
    });
    const count = await prisma_C.comment.count({
      where: {
        id: Number(post_no),
      },
    });
    //使ってる
    const update = await prisma_C.message.update({
      data: {
        comment_count: count,
      },
      where: {
        id: Number(post_no),
      },
    });
    return NextResponse.json({ comment, message: "Success" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma_C.$disconnect();
  }
}
