import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function DB() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("DB接続に失敗しました");
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await DB();
    const data = await req.json();
    const userId = data.userId;
    const Id = data.Id;

    //follow
    const user = await prisma.user.findFirst({
      where: {
        id: Id,
      },
    });
    const followed = await prisma.follow.findFirst({
      where: {
        followId: Id,
        userId: userId,
      },
    });
    const followed_count = await prisma.follow.count({
      where: {
        userId: Id,
      },
    });
    //follow
    const followeder_count = await prisma.follower.count({
      where: {
        userId: Id,
      },
    });
    return NextResponse.json(
      { followed, followed_count, followeder_count, message: "Success", user },
      { status: 201 },
    );
  } catch (err) {
    console.log("エラー", err);
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
