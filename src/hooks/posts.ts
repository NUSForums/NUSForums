import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { Post } from '../store/posts/type';

export const useFetchPosts = (moduleCode: string) => {
  const [posts, setPosts] = useState<Post[]>([]);
  // Create a query against the collection.

  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      where('moduleCode', 'in', [(moduleCode.toLowerCase(), moduleCode.toUpperCase())])
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts: Post[] = [];
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        posts.push(doc.data() as Post);
      });
      console.log(posts);
      setPosts(posts);
    });
    return unsubscribe;
  }, [moduleCode]);

  return { posts };
};
