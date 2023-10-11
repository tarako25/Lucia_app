import { NextRequest, NextResponse } from "next/server";

import prisma_C from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const start = data.start;
    const Pageitem = data.Pageitem;
    const list = await prisma_C.message.findMany({
      include: {
        good: true,
      },
      orderBy: {
        id: "desc",
      },
      skip: start,
      take: Pageitem,
    });
    const count = await prisma_C.message.count();

    return NextResponse.json(
      { count, list, message: "Success" },
      { status: 201 }
    );
  } catch (err) {
    console.log("エラー", err);
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma_C.$disconnect();
  }
}
