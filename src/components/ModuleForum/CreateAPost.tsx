import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import RichTextEditor from './RichTextEditor';

const CreateAPost = () => {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <>
      {!showEditor ? (
        <div className="flex flex-col items-center justify-center w-full h-32 my-5">
          <div
            className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer hover:bg-gray-200"
            onClick={() => setShowEditor(true)}
          >
            <FaPlus className="text-forum-createPost" />
            <div className="mt-2 font-bold text-center text-forum-createPost font-poppins">Create a post</div>
          </div>
        </div>
      ) : (
        <div className="px-4 py-6 my-5 bg-white shadow-post rounded-xl">
          <RichTextEditor setShowEditor={setShowEditor} />
        </div>
      )}
    </>
  );
};

export default CreateAPost;
