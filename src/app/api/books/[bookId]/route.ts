import { db } from "@/lib/db";
import { NextResponse } from "next/server";


interface contextProps {
         params: {
         bookId: number
         }
      }
// delete function
export async function DELETE(req: Request, context: contextProps){
    try {
        const {params} = context;
       
       await db.book.delete({
      
           where: {
            id: Number(params.bookId)
           }
        });
        
        return new Response (null, {status: 204})
    
    } catch (error) {
        console.log('error: ', error)
        return NextResponse.json({message: "could not delete book"}, {status:500})
    }
}
// update for after delete
export async function PATCH(req: Request, context: contextProps){
    try {
        const {params} = context;
       const body = await req.json();
       await db.book.update({
      
           where: {
            id: Number(params.bookId)
           },
           data: {
            bookTitle: body.bookTitle,
                author_1: body.author_1,
                author_2: body.author_2,
                notes: body.notes,
                userId:Number(body.userId)
           }
        });
        
        return NextResponse.json({message: "update success"}, {status:200})
    
    } catch (error) {
        console.log('error: ', error)
        return NextResponse.json({message: "could not update book"}, {status:500})
    }
}

// get for edit enablement
export async function GET(req: Request, context: contextProps) {
    try {
        const {params} = context;
        const book = await db.book.findFirst({
            where: {
                id: Number(params.bookId)
            },
            include: {
                user: true
            }
        });
        return NextResponse.json(book, {status:200}) 
    } catch (error) {
        return NextResponse.json({message:'could not fetch users'}, {status:500})
    }
}
























// import { db } from "@/lib/db"
// import { NextResponse } from "next/server"

//  interface contextProps {
//     params: {
//         bookId: string
//     }
//  }
//  export async function Delete(req: Request, context: contextProps) {
//     try {
//         const {params} = context;
//         await db.book.delete({
//             where: {
//                 id: Number(params.bookId)
//             }
//         });
//         return new Response(null, {status: 204})
//     } catch (error) {
//         return NextResponse.json({message: 'could not delete book'}, {status: 500 })
//     }
//  }
// //Patch function to handle the delete
//  export async function PATCH(req: Request, context: contextProps) {
//     try {
//         const {params} = context;
//         const body = await req.json();

//         await db.book.update({
//             where: {
//                 id: Number(params.bookId)
//             },
//             data: {
//                 bookTitle: body.bookTitle,
//                 author_1: body.author_1,
//                 author_2: body.author_2,
//                 notes: body.notes,
//                 userId: body.userId
//             }
//         });
//         return NextResponse.json({message: 'update success'}, {status: 200 })
//     } catch (error) {
//         return NextResponse.json({message: 'could not update book'}, {status: 500 })
//     }
//  }

//  //fetching data to be deleted
//  export async function GET(req: Request, context: contextProps){
//     try {
//         const {params} = context;
//         const book = await db.book.findFirst({
//             where: {
//                 id: Number(params.bookId)
//             },
//         })
//     } catch (error) {
//         return NextResponse.json({message: 'could not fetch books'}, {status: 500})
//     }
//  }