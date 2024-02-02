// import { authOptions } from "@/lib/auth"
// import { getServerSession } from "next-auth"

 
//  const page = async () => {
//   const session = await getServerSession(authOptions)
//   if(session?.user) {
//     return <h2>Admin page - welcome back {session?.user.username}</h2>
//   }

//    return <h2>Please login to see this admin page</h2>
//  }
 
//  export default page

import { MdLibraryAdd } from "react-icons/md";
import PostCard from "@/components/todos/PostCard"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { db } from "@/lib/db";
import BackButton from "@/components/todos/BackButton";

async function getBooks() {
  const response = await db.book.findMany({
    select: {
      id: true,
      bookTitle: true,
      author_1: true,
    author_2: true,
    notes: true
    }
  });
  return response;

}

const page = async () => {
  const books = await getBooks();
  console.log(books);

  return (
   <main >
    <div className="hover:underline flex  items-center justify-center gap-5 mt-1 text-3xl">
    <BackButton/>
    <Link className={buttonVariants()} href='/create'> CREATE BOOK <MdLibraryAdd size={15} className='ml-2' /></Link>
    </div>
    <div className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
      {books.map(book =>(
        <PostCard key={book.id}book={book} />
      ))}
    </div>
   
   </main>
  )
}

export default page
