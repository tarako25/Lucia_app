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

export async function POST (req: Request, res:NextResponse){
    try {
        await DB();
        const data = await req.json();
        const msg = data.message
        const user_id = data.userId
        const mylist = await prisma.message.create({
            data: {
                content: msg,
                user:{
                    connect: {
                        id: user_id // ここで関連するユーザーのIDを指定
                    }
                }, 
            }
        });
        return NextResponse.json({ message: "Success", mylist}, {status: 201});
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Error", err}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}