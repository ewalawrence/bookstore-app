'use client';
import { FormInputPost } from "@/types";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormPostProps {
    submit: SubmitHandler<FormInputPost>
    isEditing: boolean;
    initialValue? : FormInputPost;
}

const FormPost: FC<FormPostProps> = ({submit, isEditing, initialValue}) => {
const {register, handleSubmit} =useForm<FormInputPost>({
  defaultValues: initialValue,
}); 

// fetch list users
const {data: dataUsers, isPending: isPendingUsers} = useQuery<User[]>({
  queryKey: ['users'],
  queryFn: async () => {
    const response = await axios.get('/api/users');
    return response.data;
  },
});
console.log(dataUsers); 


  return (
   <form onSubmit={handleSubmit(submit)} 
   className=" flex flex-col items-center justify-center gap-5 mt-1">
    
{/* xs */}
<input  {...register("bookTitle", {required: true})}
type="text" placeholder="BookTitle" className="input input-bordered mx-14 w-full max-w-lg" />
{/* sm */}
<input {...register("author_1", {required: true})}
type="text" placeholder="AuthorOne" className="input input-bordered  w-full max-w-lg" />
{/* md */}
<input {...register("author_2", {required: true})}
type="text" placeholder="AuthorTwo" className="input input-bordered  w-full max-w-lg" />
{/* lg */}
<textarea {...register("notes", {required: true})}
placeholder="Notes..." className="textarea textarea-bordered w-full max-w-lg" />
{/* */}

{isPendingUsers ? (
  'loading...'
  ) : (
  <select
  {...register("userId", {required: true})}
 className="select select-bordered w-full max-w-lg"
 defaultValue={''}
 >
 <option disabled value='' >Specify User</option>
 {dataUsers?.map((item )=>(
     <option key={item.id} value={item.id}>{item.id}</option>
 ))}
 </select>
) }

<button type="submit" className="btn btn-primary w-full max-w-lg">
  {isEditing? 'Update' : 'Create'}
</button>
   </form>
   
  )
}

export default FormPost