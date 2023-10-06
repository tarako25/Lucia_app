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
        const userId = data.userId
        const start = data.start
        const Pageitem = data.Pageitem
        const followUsers = await prisma.follow.findMany({
            where: {
                userId:userId
            }
        })
        let followsId = followUsers.map(user => user.followId)
            //自分の投稿を含める
            followsId.push(userId)
        const mylist = await prisma.message.findMany({
            where:{
                userId: {
                    in: followsId
                }
            },
            orderBy: {
                id: 'desc'
            },
            skip: start,
            take: Pageitem,
        });
        
        const count = await prisma.message.count({
            where:{
                userId: {
                    in: followsId
                }
        }
        })
        return NextResponse.json({ message: "Success", mylist, count}, {status: 201});
    } catch (err) {
        return NextResponse.json({ message: "Error", err}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}