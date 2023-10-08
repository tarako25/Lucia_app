import  prisma  from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function DB(){
    try {
        await prisma.$connect();
    } catch (error) {
        return Error("DB接続に失敗しました")
    }
}

export async function POST (req: Request, res:NextResponse){
    try {
        await DB();
        const data = await req.json();
        const userId = data.urlid
        const start = data.start
        const Pageitem = data.Pageitem

        const goodpost = await prisma.user.findFirst({
            where: {
              id: userId,
            },
            include: {
              good: true,
            },
          });
        const goodPosts = goodpost?.good.map(user => user.post_no)

        const list = await prisma.message.findMany({
            where:{
                id: {
                    in: goodPosts
                }
            },
            orderBy: {
                id: 'desc'
            },
            include: {
                good: true
            },
            skip: start,
            take: Pageitem,
        });
        
        const count = await prisma.message.count({
            where:{
                userId: userId
        }
        })
        return NextResponse.json({ message: "Success", list, count}, {status: 201});
    } catch (err) {
        return NextResponse.json({ message: "Error", err}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}