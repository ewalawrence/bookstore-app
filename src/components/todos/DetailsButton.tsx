'use client';

import {Pencil, Trash2} from "lucide-react";
import Link from "next/link"
import BackButton from "@/components/todos/BackButton";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import { useRouter } from "next/navigation";



interface DetailPageProps {
    id: number
}

const DetailsButton: FC<DetailPageProps> = ({id}) =>{
    const router = useRouter();

    const {mutate: deleteBook, isPending} = useMutation({
        mutationFn: async () => {
            return axios.delete(`/api/books/${id}`);
        },
        onError: (error) => {
            console.error(error);
            },
            onSuccess: () => {
              router.push('/admin')
              router.refresh();
            },
    })

    return (
        <div className="ml-6 justify-between" ><BackButton />
            <Link href={`/editPage/${id}`} className="btn mr-2">
            <Pencil color="blue" />
            Edit
            </Link>

            <button onClick={() => deleteBook()} className="btn ">
            {isPending && <span className="loading loading-spinner"></span>}
             {isPending ? (
                'Loading...'
             ) : (
                <><Trash2 size={20} color="red" />
                Delete</>
             )}
                </button>
        </div>
    )
}

export default DetailsButton