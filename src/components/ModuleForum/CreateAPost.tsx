import { useEffect, useState, useMemo } from 'react';
import { FaPlus } from 'react-icons/fa';
import RichTextEditor from './RichTextEditor.jsx';

const CreateAPost = () => {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <>
      {!showEditor ? (
        <div className="w-full h-32 flex items-center justify-center flex-col my-5">
          <div
            className="flex items-center justify-center flex-col w-1/6 h-full rounded-lg hover:bg-gray-200 cursor-pointer"
            onClick={() => setShowEditor(true)}
          >
            <FaPlus className="text-forum-createPost" />
            <div className="text-forum-createPost mt-2 font-poppins font-bold">Create a post here</div>
          </div>
        </div>
      ) : (
        <div className="my-5">
          <RichTextEditor setShowEditor={setShowEditor} />
        </div>
      )}
    </>
  );
};

export default CreateAPost;
