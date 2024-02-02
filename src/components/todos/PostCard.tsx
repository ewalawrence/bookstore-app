// import Link from "next/link"
// import { FC } from "react";

// interface PostCardProps {
//   book: {
//     id: number;
//     bookTitle: string;
//     author_1: string;
//     author_2: string;
//     notes: string;
// }
// }

// const PostCard: FC<PostCardProps> = ({book}) => {
//   const {bookTitle, author_1, author_2, notes} = book;
//   return (
//     <div className="container pt-5 card w-full bg-base-100 shadow-xl border">
//         <div className="card-body">
//             <h2 className="card-title">{bookTitle}</h2>
//             <p>{author_1}{author_2}{notes}</p>
//            <div className="card-actions justify-end">
//             <Link href='/detailPage/1' className="hover:underline">Details...</Link>
//            </div> 
//         </div>
//     </div>
//   )
// }

// export default PostCard




import Link from "next/link"
import { FC } from "react";

interface PostCardProps {
  book: {
    id: number;
    bookTitle: string;
    author_1: string;
    author_2: string;
    notes: string;
}
}

const PostCard: FC<PostCardProps> = ({book}) => {
  const {id, bookTitle, author_1, author_2, notes} = book;

  return (
<div className="card w-96 bg-slate-400 p-2  shadow-xl ">
<span className="badge badge-neutral">{book.id}</span>
  <div className="card-body">
    <h2 className="card-title">
    { <div className="badge badge-base-secondary-content text-0xl">BookTitle:</div>}{ bookTitle}
     
    </h2>
    <p>{notes}</p> 
    <div className="flex flex-col items-end">
    <div className="card-actions justify-end pd-2">
    { <div className="badge badge-info text-0xl">Authurs:</div>}
      <div className="badge badge-outline">{author_1}</div> 
      <div className="badge badge-outline">{author_2}</div>
    </div>      
      <Link href={`/detailPage/${id}`} className="hover:underline mt-2 ">Book details...</Link>
      </div>
  </div>
</div>
  ) 
}

export default PostCard





