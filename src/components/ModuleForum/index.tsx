import { useParams } from 'react-router-dom';
import { useFetchPosts } from '../../hooks';
import { useAppSelector } from '../../hooks/reduxHooks';

const ModuleForum = () => {
  const { module } = useParams();
  const { posts } = useFetchPosts(module || '');
  const metadata = useAppSelector((state) => state.metadata);

  return (
    <div>
      <pre>{JSON.stringify(metadata, null, 2)}</pre>
      {posts.map((post) => (
        <pre>{JSON.stringify(post, null, 2)}</pre>
      ))}
    </div>
  );
};

export default ModuleForum;
