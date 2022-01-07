import { doc, runTransaction } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Post } from '../types/posts';

export const votePost = async ({
  postId,
  userId,
  type,
}: {
  postId: string;
  userId: string;
  type: ('add_upvote' | 'add_downvote' | 'remove_upvote' | 'remove_downvote')[];
}) => {
  return runTransaction(db, async (transaction) => {
    // const userRef = doc(db, 'metadata', 'current');

    // const metaDoc = await transaction.get(metadataRef);
    // if (!metaDoc.exists()) {
    //   console.error('Document does not exist!');
    //   return -1;
    // }

    // console.log(newId);
    const postRef = doc(db, 'posts', postId);
    const metaDoc = await transaction.get(postRef);
    const data = metaDoc.data() as Post;

    let changes = {};
    if (type.includes('add_downvote')) {
      changes = { ...changes, downvotes: data.downvotes + 1 };
    } else if (type.includes('remove_downvote')) {
      changes = { ...changes, downvotes: data.downvotes - 1 };
    }

    if (type.includes('add_upvote')) {
      changes = { ...changes, upvotes: data.upvotes + 1 };
    } else if (type.includes('remove_upvote')) {
      changes = { ...changes, upvotes: data.upvotes - 1 };
    }
    transaction.update(postRef, changes);
    // transaction.set(moduleRef, newPost);

    return true;
  });
};
