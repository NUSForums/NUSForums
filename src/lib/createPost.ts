import { doc, runTransaction, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { User } from '../store/user/type';

export const createPost = async ({
  title,
  body,
  tags,
  moduleCode,
  user,
}: {
  title: string;
  body: string;
  tags: string[];
  moduleCode: string;
  user: User;
}) => {
  const metadataRef = doc(db, 'metadata', 'current');
  return runTransaction(db, async (transaction) => {
    const metaDoc = await transaction.get(metadataRef);
    if (!metaDoc.exists()) {
      console.error('Document does not exist!');
      return -1;
    }

    const newId = metaDoc.data().counter + 1;
    const moduleRef = doc(db, 'posts', String(newId));
    const newPost = {
      title: title,
      body: body,
      tags: tags,
      comments: [],
      creationDate: Timestamp.fromDate(new Date()),
      id: newId,
      isAnonymous: true,
      moduleCode: moduleCode,
      upvotes: 0,
      downvotes: 0,
      userName: user.anonymousName,
      userId: user.userId,
    };

    transaction.update(metadataRef, { counter: newId });
    transaction.set(moduleRef, newPost);

    return newId;
  });
};
