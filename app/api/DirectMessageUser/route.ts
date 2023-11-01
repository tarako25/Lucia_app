import { NextRequest, NextResponse } from "next/server";

import { getPageSession } from "@/auth/lucia";
import prisma_C from "@/lib/prisma";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const session = await getPageSession();
    const url = new URL(req.url);
    const targetId = url.searchParams.get("id");
    const userId = session?.user.userId;

    const user = await prisma_C.user.findFirst({
      where: {
        id: String(userId),
      },
    });
    const target = await prisma_C.user.findFirst({
      where: {
        id: String(targetId),
      },
    });
    return NextResponse.json(
      { message: "Success", target, user },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma_C.$disconnect();
  }
}
