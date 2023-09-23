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
        const userId = await req.json();
        const mylist = await prisma.message.findMany({
            where:{
                userId: userId
            },
            orderBy: {
                id: 'desc'
            }
        });
        return NextResponse.json({ message: "Success", mylist}, {status: 201});
    } catch (err) {
        return NextResponse.json({ message: "Error", err}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}