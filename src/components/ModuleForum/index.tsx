import { useLocation, useParams } from 'react-router-dom';
import { useFetchPosts } from '../../hooks';
import { PostCard } from '../PostCard';
import RightBar from '../RightBar/RightBar';
import CreateAPost from './CreateAPost';
import Header from './Header';

const ModuleForum = () => {
  const { module } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const { posts } = useFetchPosts(module || '', queryParams.get('filter'), queryParams.get('sort'));

  return (
    <div className="flex flex-row w-full h-auto mb-2">
      <div className="flex flex-col flex-grow p-5">
        <Header />
        <RightBar moduleCode={module} className="flex flex-col-reverse gap-5 mb-5 lg:hidden" />
        <div className="text-lg font-bold text-forum-title lg:hidden">Posts</div>
        <CreateAPost />
        <div className="grid grid-cols-1 gap-5 ">
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      </div>
      <RightBar moduleCode={module} className="hidden min-h-full lg:mt-5 lg:flex lg:flex-col lg:mr-5 lg:gap-5" />
    </div>
  );
};

export default ModuleForum;
