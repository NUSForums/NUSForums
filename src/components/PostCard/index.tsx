import { Post } from '../../types/posts';
import moment from 'moment';
import { useMemo } from 'react';
import ShowMoreText from 'react-show-more-text';
import Tag from '../Tag';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const daysAgo = useMemo(() => moment(post.creationDate).fromNow(), [post.creationDate]);

  return (
    <div className="w-full px-4 py-6 shadow-post rounded-xl bg-forum-postCard">
      <div className="flex flex-row items-end gap-2">
        <div className="text-base font-semibold tracking-wide text-left">{post.title}</div>
        <div className="pb-1 text-xs text-forum-subText">{daysAgo}</div>
        <div className="ml-auto">#{post.id}</div>
      </div>

      <ShowMoreText
        /* Default options */
        // lines={5}
        more={<p className="text-sm font-semibold text-gray-700 underline">Show more</p>}
        less={<p className="text-sm font-semibold text-gray-700 underline">Show less</p>}
        keepNewLines={true}
        className="text-base text-gray-900"
        truncatedEndingComponent={'... '}
      >
        {post.body}
      </ShowMoreText>

      <div className="flex flex-row justify-between">
        <div className="flex items-center">
          {post.tags.map((tag) => (
            <Tag name={tag} key={tag} />
          ))}
        </div>
        <div>vote</div>
      </div>

      {post.comments.length > 0 && (
        <div className="mt-5">
          {post.comments.map((comment, i) => {
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
        </div>
      )}
    </div>
  );
};
