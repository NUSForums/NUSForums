import { Post } from '../../types/posts';
import moment from 'moment';
import { useMemo } from 'react';
import Tag from '../Tag';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import AddComment from './AddComment';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { votePost } from '../../lib/votePost';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import MDEditor from '@uiw/react-md-editor';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const daysAgo = useMemo(() => moment(post.creationDate).fromNow(), [post.creationDate]);
  const { votes, user } = useAppSelector((state) => ({ votes: state.votes[post.moduleCode], user: state.user }));
  const dispatch = useAppDispatch();

  const upVote = () => {
    dispatch({ type: 'TOGGLE_UPVOTE', payload: { module: post.moduleCode, post: post.id } });
    if (votes && votes[post.id] === '+') {
      return votePost({
        postId: post.id,
        userId: user.userId,
        type: ['remove_upvote'],
      });
    } else if (votes && votes[post.id] === '-') {
      return votePost({
        postId: post.id,
        userId: user.userId,
        type: ['add_upvote', 'remove_downvote'],
      });
    } else {
      return votePost({
        postId: post.id,
        userId: user.userId,
        type: ['add_upvote'],
      });
    }
  };

  const downVote = () => {
    dispatch({ type: 'TOGGLE_DOWNVOTE', payload: { module: post.moduleCode, post: post.id } });
    if (votes && votes[post.id] === '-') {
      return votePost({
        postId: post.id,
        userId: user.userId,
        type: ['remove_downvote'],
      });
    } else if (votes && votes[post.id] === '+') {
      return votePost({
        postId: post.id,
        userId: user.userId,
        type: ['add_downvote', 'remove_upvote'],
      });
    } else {
      return votePost({
        postId: post.id,
        userId: user.userId,
        type: ['add_downvote'],
      });
    }
  };

  return (
    <div className="w-full px-4 py-6 shadow-post rounded-xl bg-forum-postCard">
      <div className="flex flex-row items-end gap-2">
        <div className="text-base font-semibold tracking-wide text-left">{post.title}</div>
        <div className="pb-1 text-xs text-forum-subText">{daysAgo}</div>
        <div className="ml-auto">#{post.id}</div>
      </div>

      <div>
        <MDEditor.Markdown source={post.body} rehypePlugins={[[rehypeSanitize]]} />
      </div>

      <div className="flex flex-row justify-between">
        <div className="flex items-center">
          {post.tags.map((tag) => (
            <Tag name={tag} key={tag} />
          ))}
        </div>
        <div className="flex flex-row items-center gap-3">
          <div
            className={`p-1 flex flex-row items-center cursor-pointer rounded-lg ${
              votes?.[post.id] === '+' ? ' border-2' : ''
            }`}
            onClick={() =>
              upVote().catch((err) => {
                console.log(err);
                toast.error('Please login to vote');
              })
            }
          >
            <MdThumbUp className="mr-1 text-blue-500" />
            {post.upvotes}
          </div>
          <div
            className={`p-1 flex flex-row items-center cursor-pointer rounded-lg ${
              votes?.[post.id] === '-' ? ' border-2' : ''
            }`}
            onClick={() =>
              downVote().catch((err) => {
                console.log(err);
                toast.error('Please login to vote');
              })
            }
          >
            <MdThumbDown className="mr-1 text-red-500" />
            {post.downvotes}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {post.comments.length > 0 &&
          post.comments.map((comment, i) => {
            return (
              <div className="flex flex-row" key={`${comment.comment}-${i}`}>
                <img
                  className="w-10 h-10 p-1 bg-white rounded-full"
                  alt="profile"
                  src={`https://avatars.dicebear.com/api/gridy/${comment.userName.replaceAll(' ', '')}.svg`}
                />
                <div className={`px-4 py-3 w-full bg-forum-searchbar rounded-xl text-sm text-justify`}>
                  <div className="pb-1 text-sm font-semibold">{comment.userName}</div>
                  {comment.comment}
                </div>
              </div>
            );
          })}
        <AddComment postId={post.id} />
      </div>
    </div>
  );
};
