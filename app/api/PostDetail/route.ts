import { NextRequest, NextResponse } from "next/server";

import prisma_C from "@/lib/prisma";

export async function POST(req: Request, res: NextResponse) {
  try {
    const no = await req.json();
    const post_no = parseInt(no);
    const post = await prisma_C.message.findFirst({
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
    await prisma_C.$disconnect();
  }
}
