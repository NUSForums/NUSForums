import { useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from './Button';
import { useAppSelector } from '../../hooks/reduxHooks';
import { addComment } from '../../lib/addComment';
import { toast } from 'react-toastify';

const CommentEditor = ({ setShowEditor, postId }) => {
  const commentRef = useRef();
  const { user } = useAppSelector((state) => ({
    user: state.user,
  }));

  function removeHTML(str) {
    var tmp = document.createElement('DIV');
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || '';
  }

  const onSubmit = () => {
    console.log(commentRef.current);
    return addComment({
      comment: removeHTML(commentRef.current),
      postId,
      user,
    })
      .catch((err) => {
        console.log(err);
        toast.error('Please login to comment');
      })
      .finally(() => {
        setShowEditor(false);
      });
  };

  return (
    <div>
      <div className="flex flex-row">
        <div className={`px-4 py-3 w-full bg-forum-postCard shadow-md rounded-xl text-sm text-justify`}>
          <div className="pb-1 text-sm font-semibold">{user.anonymousName}</div>

          <CKEditor
            editor={ClassicEditor}
            config={{ toolbar: [] }}
            data=""
            onChange={(event, editor) => {
              const data = editor.getData();
              commentRef.current = data;
            }}
          />
        </div>
        <img className="w-10 h-10 p-1 rounded-full bg-forum-postCard" alt="profile" src={user.image} />
      </div>
      <div className="flex items-center justify-center w-full">
        <Button text="Cancel" onClick={() => setShowEditor(false)} />
        <Button text="Send" onClick={() => onSubmit()} isSubmitButton={true} />
      </div>
    </div>
  );
};

export default CommentEditor;
