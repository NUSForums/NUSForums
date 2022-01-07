import { collection, onSnapshot, orderBy, query, QueryConstraint, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { Post } from '../types/posts';

export const useFetchPosts = (moduleCode: string, filter?: string | null, sort?: string | null) => {
  const [posts, setPosts] = useState<Post[]>([]);
  // Create a query against the collection.

  useEffect(() => {
    const queryConstraints: QueryConstraint[] = [
      sort === 'popular' ? orderBy('upvotes', 'desc') : orderBy('creationDate', 'desc'),
      where('moduleCode', 'in', [(moduleCode.toLowerCase(), moduleCode.toUpperCase())]),
    ];

    if (filter) {
      queryConstraints.push(where('tags', 'array-contains', filter));
    }

    const q = query(collection(db, 'posts'), ...queryConstraints);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts: Post[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.creationDate = data.creationDate.toDate();
        data.comments =
          data.comments?.map((comment: any) => {
            comment.creationDate = comment.creationDate.toDate();
            return comment;
          }) || [];

        posts.push(data as Post);
        console.log(data);
      });
      setPosts(posts);
    });
    return unsubscribe;
  }, [moduleCode, filter, sort]);

  return { posts };
};
