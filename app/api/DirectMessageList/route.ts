import { NextRequest, NextResponse } from "next/server";

import prisma_C from "@/lib/prisma";
import { getPageSession } from "@/auth/lucia";

export async function GET(req: Request, res: NextResponse) {
  try {
    const session = await getPageSession();
    const userId = session?.user.userId;

    const user = await prisma_C.directMessage.findMany({
      where: {
        OR: [
          {
            userId: userId,
          },
          {
            targetId: userId,
          },
        ],
      },
      distinct: ["targetId"],
    });
    return NextResponse.json({ message: "Success", user }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma_C.$disconnect();
  }
}
