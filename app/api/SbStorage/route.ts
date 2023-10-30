import { NextRequest, NextResponse } from "next/server";

import prisma_C from "@/lib/prisma";

export async function POST(req: Request, res: NextResponse) {
  try {
    const data = await req.json();
    const url = data.url;
    const userId = data.userId;
    await prisma_C.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar_img: url,
      },
    });
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma_C.$disconnect();
  }
}
