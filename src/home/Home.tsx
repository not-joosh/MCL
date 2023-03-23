import { getDocs, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useState, useEffect } from 'react';
import { Post } from './Post';
/*
    No need to use reactquery because we are using
    firebase
*/
export interface Post {
    id: string;
    userId: string;
    title: string;
    username: string;
    description: string;
}
export const Home = () => {
    const [postList, setPostList] = useState<Post[] | null>(null);
    const postsRef = collection(db, "posts");
    const getPost = async () => {
        const data = await getDocs(postsRef);
        // console.log(data);
        // console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[]);
    }
    useEffect(() => {
        getPost();
    }, []);
    return (
        <div>
            {postList?.map((post) => {
                return (
                    <Post post = {post}/>
                )
            })}
        </div>
    )
}