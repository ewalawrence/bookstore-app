import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const books = await db.book.findMany();
        return NextResponse.json(books, {status:200})
    } catch (error) {
        return NextResponse.json({message:'could not fetch books'}, {status:500})
    }
}