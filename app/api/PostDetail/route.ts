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
    const no = await req.json();
    const post_no = parseInt(no);
    const post = await prisma.message.findFirst({
      include: {
        good: true,
        user: true,
      },
      where: {
        id: post_no,
      },
    });
    return NextResponse.json({ message: "Success", post }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
