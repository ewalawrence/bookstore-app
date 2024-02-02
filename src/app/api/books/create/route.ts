import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const body = await req.json();
        console.log('body', body)
        const book = await db.book.create({
      
            data: {
                bookTitle: body.bookTitle,
                author_1: body.author_1,
                author_2: body.author_2,
                notes: body.notes,
                userId: Number(body.userId)
            }
        });
        
        return NextResponse.json(book, {status:200})
    
    } catch (error) {
        console.log('error: ', error)
        return NextResponse.json({message: "could not create book"}, {status:500})
    }
}

