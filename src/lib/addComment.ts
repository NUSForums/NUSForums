import { doc, runTransaction, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { User } from '../store/user/type';

export const addComment = async ({ comment, postId, user }: { comment: string; postId: string; user: User }) => {
  return runTransaction(db, async (transaction) => {

    const postRef = doc(db, 'posts', String(postId));
    const postDoc = await transaction.get(postRef);
    if (!postDoc.exists()) {
      console.error('Document does not exist!');
      return -1;
    }
    const comments = postDoc.data().comments;

    const newCommentId = (comments?.length || 0) + 1;
    const newComment = {
      id: String(newCommentId),
      userId: user.userId,
      userName: user.anonymousName,
      comment: comment,
      upvotes: 0,
      downvotes: 0,
      creationDate: Timestamp.fromDate(new Date()),
    };
    console.log(newComment);

    transaction.update(postRef, { comments: [newComment, ...comments] });

    return newCommentId;
  });
};
