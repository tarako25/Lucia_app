import { NextRequest, NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";

export async function DB(){
    try {
        await prisma.$connect();
    } catch (error) {
        return Error("DB接続に失敗しました")
    }
}

export async function POST (req: NextRequest, res:NextResponse){
    try {
        await DB();
        const data = await req.json()
        const start = data.start
        const Pageitem = data.Pageitem
        const list = await prisma.message.findMany({
            orderBy: {
                id: 'desc'
            },
            include: {
                good: true
            },
            skip: start,
            take: Pageitem,
            
        });
        const count = await prisma.message.count()

        return NextResponse.json({ message: "Success", list, count}, {status: 201});
    } catch (err) {
        console.log("エラー",err)
        return NextResponse.json({ message: "Error", err}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}