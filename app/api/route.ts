import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DB(){
    try {
        await prisma.$connect();
    } catch (error) {
        return Error("DB接続に失敗しました")
    }
}

export async function GET (req: Request, res:NextResponse){
    try {
        await DB();
        const list = await prisma.message.findMany({
            orderBy: {
                id: 'desc'
            }
        });
        return NextResponse.json({ message: "Success", list}, {status: 201});
    } catch (err) {
        console.log("エラー",err)
        return NextResponse.json({ message: "Error", err}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}