import { useRef } from 'react';
import Button from './Button';
import { useAppSelector } from '../../hooks/reduxHooks';
import { addComment } from '../../lib/addComment';
import { toast } from 'react-toastify';

const CommentEditor = ({ setShowEditor, postId }: { setShowEditor: (val: boolean) => any; postId: string }) => {
  const commentRef = useRef<string>();
  const { user } = useAppSelector((state) => ({
    user: state.user,
  }));

  function removeHTML(str: string) {
    var tmp = document.createElement('DIV');
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || '';
  }

  const onSubmit = () => {
    if (!commentRef.current) {
      toast.error('Cannot make an empty comment');
      return;
    }

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
          <textarea
            rows={1}
            className="w-full p-1"
            placeholder="Enter your comment..."
            onChange={(e) => {
              commentRef.current = e.target.value;
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
