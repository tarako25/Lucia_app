import { NextRequest, NextResponse } from "next/server";

import prisma_C from "@/lib/prisma";

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    //URLから取得
    const url = new URL(req.url);
    const postId = url.searchParams.get("id");
    if (postId === null) {
      return NextResponse.json(
        { message: "postIdが指定されていません" },
        { status: 400 }
      );
    }
    //コメントを削除
    const comment = await prisma_C.comment.deleteMany({
      where: {
        id: parseInt(postId),
      },
    });
    //Goodを削除
    const good = await prisma_C.good.deleteMany({
      where: {
        post_no: parseInt(postId),
      },
    });
    //メッセージを削除
    const message = await prisma_C.message.delete({
      where: {
        id: parseInt(postId),
      },
    });
    return NextResponse.json({ comment, message: "Success" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma_C.$disconnect();
  }
}
