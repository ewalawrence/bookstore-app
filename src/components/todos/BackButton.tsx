'use client';

import { useRouter } from "next/navigation";
import { IoChevronBackCircleOutline } from "react-icons/io5";

const BackButton = () => {
    const router = useRouter(); 
  return (
    <button className="btn mx-1" onClick={() => router.back()}><IoChevronBackCircleOutline size={20}/>Back</button>
  )
}

export default BackButton