'use client';


import BackButton from "@/components/todos/BackButton";
import FormPost from "@/components/todos/FormPost"
import { FormInputPost } from "@/types"
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form"
import axios from 'axios';

const CreatePage = () => {
  const router = useRouter();
const handleCreatePost: SubmitHandler<FormInputPost>  = (data) => {
createBook(data);
}
 
const {mutate: createBook, isPending} = useMutation({
  mutationFn: (newBook: FormInputPost) => {
    return axios.post('/api/books/create', newBook)
  },
  onError: (error) => {
  console.error(error);
  },
  onSuccess: () => {
    router.push('/admin')
    router.refresh();
  },
});
  return (
    <div>
      <BackButton/>
        <h1 className="text-2xl my-4 font-bold text-center">Add New Book</h1>
    <FormPost submit={handleCreatePost} isEditing= {false}/>
    </div>
  )
}

export default CreatePage