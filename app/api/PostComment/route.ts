import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function DB() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("DB接続に失敗しました");
  }
}

export async function POST(req: Request, res: NextResponse) {
  try {
    await DB();
    const data = await req.json();
    const post_no = data.post_no;
    const start = data.start;
    const Pageitem = data.Pageitem;
    const comment = await prisma.comment.findMany({
      skip: start,
      take: Pageitem,
      where: {
        id: parseInt(post_no),
      },
    });

    const count = await prisma.comment.count();

    return NextResponse.json(
      { comment, count, message: "Success" },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
