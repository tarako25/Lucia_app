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
    const userId = data.urlid;
    const Pageitem = data.Pageitem;
    const start = data.start;
    const list = await prisma.message.findMany({
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
    const count = await prisma.message.count({
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
    await prisma.$disconnect();
  }
}
