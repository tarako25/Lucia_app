import { NextRequest, NextResponse } from "next/server";

import prisma_C from "@/lib/prisma";

export async function POST(req: Request, res: NextResponse) {
  try {
    const data = await req.json();
    const userId = data.urlid;
    const Pageitem = data.Pageitem;
    const start = data.start;
    const list = await prisma_C.message.findMany({
      include: {
        good: true,
      },
      orderBy: {
        id: "desc",
      },
      skip: start,
      take: Pageitem,
      where: {
        userId: userId,
      },
    });
    const count = await prisma_C.message.count({
      where: {
        userId: userId,
      },
    });
    return NextResponse.json(
      { count, list, message: "Success" },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma_C.$disconnect();
  }
}
