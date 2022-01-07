import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

// TODO: JH
export const apiFetchPosts = async (moduleCode?: string) => {
  const postsCollection = collection(db, 'posts');
  const postSnap = await getDocs(postsCollection);
};
