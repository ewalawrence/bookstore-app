// import { buttonVariants } from "@/components/ui/button";
// import Link from "next/link";

// export default function Home() {
//   return <div>  <h1 className='text-4xl'>Home Page</h1>
//   <Link className={buttonVariants()} href="/admin">Open My Admin</Link>
  
//   </div>
// }

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";



export default function Home() {
    return (
        <div >
            <h1 className="text-2xl font-bold text-center">Home Page</h1>
            <div  className="flex" >
          <div className="mr-1" >
          <Link className={buttonVariants()} href='/sign-in'>
              Sign-in 
              </Link> 
          </div>
              <Link className={buttonVariants()} href='/sign-up'>
              Sign-up 
              </Link>
            </div>
           
        </div>
    );
}

