'use client';

import BackButton from "@/components/todos/BackButton";
import FormPost from "@/components/todos/FormPost";
import { FormInputPost } from "@/types";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, use } from "react";
import { SubmitHandler } from "react-hook-form";

interface EditPageProps {
  params: {
    id: number;
  };
}

const EditPage: FC<EditPageProps> = ({params}) => {
  const router = useRouter();
  const {id} = params;
  //graping data for the get
  const {data: dataBook, isPending: isPendingBook} = useQuery({
    queryKey: ['books', id],
    queryFn:async () => {
      const response = await axios.get(`/api/books/${id}`)
      return response.data; 
    }
  });

  const {mutate: updateBook, isPending: isPendingSubmit} = useMutation({
    mutationFn: (newBook: FormInputPost) => {
      return axios.patch(`/api/books/${id}`, newBook)
    },
    onError: (error) => {
    console.error(error);
    },
    onSuccess: () => {
      router.push('/admin')
      router.refresh();
    },
  });

    const handleEditPost: SubmitHandler<FormInputPost>  = (data) => {
       updateBook(data);
        };

        if(isPendingBook) {
          return (
            <div className="text-center">
              <span className="loading loading-spinner loading-lg" ></span>
            </div>
          )
        }
           
          return (
            <div>
              
                <h1 className="text-2xl mx-9 my-4 font-bold text-center">  <BackButton />Edit Book</h1>
            <FormPost submit={handleEditPost} initialValue={dataBook} isEditing/>
            </div>
          )
        }

export default EditPage