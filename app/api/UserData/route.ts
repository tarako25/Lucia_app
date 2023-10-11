import { NextRequest, NextResponse } from "next/server";

import prisma_C from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const userId = data.userId;
    const Id = data.Id;

    //follow
    const user = await prisma_C.user.findFirst({
      where: {
        id: Id,
      },
    });
    const followed = await prisma_C.follow.findFirst({
      where: {
        followId: Id,
        userId: userId,
      },
    });
    const followed_count = await prisma_C.follow.count({
      where: {
        userId: Id,
      },
    });
    //follow
    const followeder_count = await prisma_C.follower.count({
      where: {
        userId: Id,
      },
    });
    return NextResponse.json(
      { followed, followed_count, followeder_count, message: "Success", user },
      { status: 201 }
    );
  } catch (err) {
    console.log("エラー", err);
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma_C.$disconnect();
  }
}
