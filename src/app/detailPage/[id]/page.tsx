
import DetailsButton from "@/components/todos/DetailsButton"
import { db } from "@/lib/db";
import { FC } from "react";


interface DetailPageProps {
    params: {
        id: number;
    };
}
async function getBook(id: number) {
    const response = await db.book.findUnique({
        where: {
            id:Number(id )      
        },
        select: {
            id: true,
            bookTitle: true,
            author_1:true,
            author_2: true,
            notes: true,
        },
    });
    return response;
}
const DetailPage: FC<DetailPageProps> = async ({params}) => {
    const book = await getBook(params.id);
  
    return (
        <div>  <DetailsButton id={params.id}/>
          {/* <div>  <DetailsButton id={params.id.toString()}/> */}
      <div className="card w-96 bg-slate-500 shadow-xl">
      <div className="mb-8 items-center flex flex-col justify-between" >
         
        
          <h2 className="text-2xl font-bold my-4" >
              {book?.bookTitle}
          </h2>
      </div>
      <p className="text-slate-700 mx-10 text-center mb-16" >{book?.notes}</p>
      
      <div className="card-actions justify-end mr-5 mb-5">
    { <div className="badge badge-info text-0xl">Authurs:</div>}
      <div className="badge badge-outline">{book?.author_1}</div> 
      <div className="badge badge-outline">{book?.author_2}</div>
    </div>  
    </div>
     </div>
    )
  }
  
  export default DetailPage 