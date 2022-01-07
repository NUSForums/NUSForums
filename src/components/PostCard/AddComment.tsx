import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import CommentEditor from './CommentEditor';

const AddComment = ({ postId }: { postId: string }) => {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <>
      {!showEditor ? (
        <div
          className="flex flex-row items-center w-full pb-1 pl-10 rounded-lg cursor-pointer text-forum-createPost hover:text-gray-400 "
          onClick={() => setShowEditor(true)}
        >
          <FaPlus className="w-3 h-3 mx-1 my-2" />
          <div className="mt-2 text-sm font-semibold text-center font-poppins ">Add a comment</div>
        </div>
      ) : (
        <div className="">
          <CommentEditor setShowEditor={setShowEditor} postId={postId} />
        </div>
      )}
    </>
  );
};

export default AddComment;
