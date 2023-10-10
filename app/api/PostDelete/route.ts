import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function DB() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("DB接続に失敗しました");
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    await DB();
    //URLから取得
    const url = new URL(req.url);
    const postId = url.searchParams.get("id");
    if (postId === null) {
      return NextResponse.json(
        { message: "postIdが指定されていません" },
        { status: 400 },
      );
    }
    //コメントを削除
    const comment = await prisma.comment.deleteMany({
      where: {
        id: parseInt(postId),
      },
    });
    //Goodを削除
    const good = await prisma.good.deleteMany({
      where: {
        post_no: parseInt(postId),
      },
    });
    //メッセージを削除
    const message = await prisma.message.delete({
      where: {
        id: parseInt(postId),
      },
    });
    return NextResponse.json({ comment, message: "Success" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
