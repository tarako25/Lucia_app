import { NextRequest, NextResponse } from "next/server";

import prisma_C from "@/lib/prisma";

export async function POST(req: Request, res: NextResponse) {
  try {
    const data = await req.json();
    const post_no = data.post_no;
    const start = data.start;
    const Pageitem = data.Pageitem;
    const comment = await prisma_C.comment.findMany({
      skip: start,
      take: Pageitem,
      where: {
        id: parseInt(post_no),
      },
    });

    const count = await prisma_C.comment.count();

    return NextResponse.json(
      { comment, count, message: "Success" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma_C.$disconnect();
  }
}
