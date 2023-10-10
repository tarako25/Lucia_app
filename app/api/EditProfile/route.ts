import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function PUT(req: Request, res: NextResponse) {
  try {
    const data = await req.json();
    const username = data.name;
    const production = data.pr;
    const userId = data.urlId;
    const user = await prisma.user.update({
      data: {
        production: production,
        username: username,
      },
      where: {
        id: userId,
      },
    });
    return NextResponse.json({ message: "Success", user }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
