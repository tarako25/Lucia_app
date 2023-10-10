import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const userId = data.userId;
    const postNo = data.no;
    //日付作成
    const now = new Date();
    //ISO形式に変換
    const nowISO8601 = now.toISOString();
    const good = await prisma.good.create({
      data: {
        createdAt: nowISO8601,
        message: {
          connect: {
            id: parseInt(postNo),
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    const count = await prisma.good.count({
      where: {
        post_no: Number(postNo),
      },
    });

    const update = await prisma.message.update({
      data: {
        good_count: count,
      },
      where: {
        id: Number(postNo),
      },
    });
    return NextResponse.json(
      { count, good, message: "Success" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const userId = data.userId;
    const postNo = data.no;
    const good = await prisma.good.findFirst({
      where: {
        post_no: parseInt(postNo),
        userId: userId,
      },
    });
    const goodNo = good?.no;

    const goodDelete = await prisma.good.delete({
      where: {
        no: goodNo,
      },
    });

    const count = await prisma.good.count({
      where: {
        post_no: Number(postNo),
      },
    });

    const update = await prisma.message.update({
      data: {
        good_count: count,
      },
      where: {
        id: Number(postNo),
      },
    });

    return NextResponse.json(
      { count, good, message: "Success" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
