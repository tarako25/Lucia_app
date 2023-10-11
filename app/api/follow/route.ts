import { NextRequest, NextResponse } from "next/server";

import prisma_C from "@/lib/prisma";

export async function POST(req: Request, res: NextResponse) {
  try {
    const data = await req.json();
    const followId = data.followId;
    const followname = data.followName;
    const user_id = data.userId;

    //日付作成
    const now = new Date();
    //ISO形式に変換
    const nowISO8601 = now.toISOString();

    //follow
    const follow = await prisma_C.follow.create({
      data: {
        createdAt: nowISO8601,
        followId: followId,
        followname: String(followname),
        user: {
          connect: {
            id: user_id, // ここで関連するユーザーのIDを指定
          },
        },
      },
    });

    //follower
    const no = follow.no;
    const follower = await prisma_C.follower.create({
      data: {
        createdAt: nowISO8601,
        follow: {
          connect: {
            no: no,
          },
        },
        followerId: user_id,
        followername: String(followname),
        user: {
          connect: {
            id: followId, // ここで関連するユーザーのIDを指定
          },
        },
      },
    });
    return NextResponse.json(
      { follow, follower, message: "Success" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma_C.$disconnect();
  }
}

export async function PUT(req: Request, res: NextResponse) {
  try {
    const no = await req.json();

    //follower
    const unfollower = await prisma_C.follower.delete({
      where: {
        follow_no: no,
      },
    });

    //follow
    const unfollow = await prisma_C.follow.delete({
      where: {
        no: no,
      },
    });

    return NextResponse.json(
      { message: "Success", unfollow, unfollower },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma_C.$disconnect();
  }
}
