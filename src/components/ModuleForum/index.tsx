import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchPosts } from '../../hooks';
import { useAppSelector } from '../../hooks/reduxHooks';
import ModuleInfo from '../ModuleInfo/ModuleInfo';
import { PostCard } from '../PostCard';
import CreateAPost from './CreateAPost';
import Header from './Header';

const ModuleForum = () => {
  const { module } = useParams();
  const { posts } = useFetchPosts(module || '');
  const metadata = useAppSelector((state) => state.metadata);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col flex-grow p-5">
        <Header />
        <CreateAPost />
        <pre>{JSON.stringify(metadata, null, 2)}</pre>
        <div>
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      </div>
      <ModuleInfo moduleCode={module} />
    </div>
  );
};

export default ModuleForum;
