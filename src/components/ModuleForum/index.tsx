import { useParams } from 'react-router-dom';
import { useFetchPosts } from '../../hooks';

const ModuleForum = () => {
  const { module } = useParams();
  const { posts } = useFetchPosts(module || '');

  return (
    <div>
      {posts.map((post) => (
        <pre>{JSON.stringify(post, null, 2)}</pre>
      ))}
    </div>
  );
};

export default ModuleForum;
