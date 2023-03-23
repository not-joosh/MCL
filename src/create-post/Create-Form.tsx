import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
interface CreateFormData {
    title: string,
    description: string,
}
export const CreateForm = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const schema = yup.object().shape({
        title: yup.string().required("You must have a Title."),
        description: yup.string().required("You must have a Description."),
    });
    // Using react-hook-form
    const { register, handleSubmit, formState: {errors}} = useForm <CreateFormData> ({
        resolver: yupResolver(schema)
    })

    const postsRef = collection(db, "posts");
    const onCreatePost = async (data: CreateFormData) => {
        /*
        RULE:
        rules_version = '2';
        service cloud.firestore {
            match /databases/{database}/documents {
                match /{document=**} {
                    allow write, delete, update: if request.auth != null && request.auth.uid == request.resource.data.userId;
                    allow read: if request.auth != null;
                }
            }
        }
        */
        // console.log(data);
        await addDoc(postsRef, {
            // title: data.title,
            // description: data.description,
            ...data,
            username: user?.displayName,
            userId: user?.uid,
        });
        navigate("/");
    };
    return (
        <form onSubmit = {handleSubmit(onCreatePost)}>
            <input type = "text" placeholder= "Title..." {...register("title")} />
            <p style = {{color: "red"}}>{errors.title?.message}</p>
            <textarea placeholder= "Description..." {...register("description")} />
            <p style = {{color: "red"}}>{errors.description?.message}</p>
            <input type = "submit" className = "submit-form" />
        </form>
    )
}